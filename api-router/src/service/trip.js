const loadenv = require("../../loadenv");
const axios = require("axios");
const {
  userModel,
  tripModel,
  imageModel,
  pinModel,
  pinElementModel,
} = require("../modules/mongo");

// const l = require("./test");

const createHandler = async (req, res) => {
  const { name, progress, imageIds, userId } = req.body;
  try {
    // db에서 이미지 정보 찾기
    const imageObjects = [];
    for (const imageId of imageIds) {
      // for (const image of l) {
      const image = await imageModel.findOne({ _id: imageId });
      imageObjects.push({
        id: image._id,
        url: `https://${loadenv.aws.s3BucketName}.s3.ap-northeast-2.amazonaws.com/image-ori/${image._id}`,
        time: image.time,
        latitude: image.latitude,
        longitude: image.longitude,
        vector: image.vector.split(",").map((x) => parseFloat(x)),
      });
    }

    try {
      //에 api 콜해서 클러스터링 결과 받아오기
      const clusterRes = await axios.post(
        `${loadenv.embeddingUrl}/clustering`,
        {
          images: imageObjects,
        }
      );

      const { clusters, startTime, endTime } = clusterRes.data;
      const pins = [];
      for (const cluster of clusters) {
        const subpin = [];
        for (const pinelem of cluster["imageSets"]) {
          let pinElement = new pinElementModel({
            mainImage: pinelem["mainImage"],
            vector: pinelem["vector"].toString(),
            images: pinelem["images"],
          });
          console.log(pinelem["mainImage"]);
          await pinElement.save();
          subpin.push(pinElement._id);
        }

        let pin = new pinModel({
          name: cluster["name"],
          note: "",
          location: cluster["location"],
          latitude: cluster["latitude"],
          longitude: cluster["longitude"],
          startTime: cluster["startTime"],
          endTime: cluster["endTime"],
          mainImage: cluster["mainImage"],
          imageSets: subpin,
        });
        await pin.save();
        pins.push(pin._id);
      }

      const user = await userModel.findOne({ id: userId }).populate("trips");
      let trip = new tripModel({
        name: name,
        startTime: startTime.toString(),
        endTime: endTime.toString(),
        progress: progress,
        pins: pins,
      });
      await trip.save();
      user.trips.push(trip._id);
      await user.save();

      res.send(trip._id); // trip._id send
    } catch (error) {
      console.log(error);
    }
  } catch (err) {
    console.log(err);
    // res.status(500).json({
    //   error: "Trip/create : internal server error",
    // });
    // return;
  }
};

// createHandler(
//   {
//     body: {
//       name: "신나는 여행여행",
//       progress: true,
//       userId: "63d50982b9091985974c36eb",
//       imageIds: [
//         "63d55413eaf96238f0251208",
//         "63d55419eaf96238f025120d",
//         "63d5541deaf96238f0251212",
//         "63d55422eaf96238f0251217",
//         "63d55427eaf96238f025121c",
//         "63d5542deaf96238f0251221",
//         "63d55432eaf96238f0251226",
//         "63d55437eaf96238f025122b",
//         "63d5543ceaf96238f0251230",
//       ],
//     },
//   },
//   {
//     json: console.log,
//     send: console.log,
//   }
// );

const pinlistHandler = async (req, res) => {
  try {
    const trip = await tripModel.findOne({ _id: req.params.tripId });
    // .populate("pins");

    // get only pins _id, latitudem logitude
    const pinlist = [];
    for (const pinId of trip.pins) {
      const pin = await pinModel.findOne({ _id: pinId });
      // console.log(pin["longitude"]);

      pinlist.push({
        _id: pinId,
        latitude: pin["latitude"],
        longitude: pin["longitude"],
        mainImage: pin["mainImage"],
      });
    }
    console.log(pinlist);
    res.send(pinlist);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Trip/pinlist : internal server error",
    });
  }
};

const infoHandler = async (req, res) => {
  try {
    const tripObject = await tripModel.findOne({ _id: req.tripId }).lean();
    res.send(tripObject);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "/trip/info: internal server error",
    });
  }
};

module.exports = {
  createHandler,
  pinlistHandler,
  infoHandler,
};
