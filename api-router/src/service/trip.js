const loadenv = require("../../loadenv");
const axios = require("axios");
const {
  userModel,
  tripModel,
  imageModel,
  pinModel,
} = require("../modules/mongo");

const fs = require("fs");

const createHandler = async (req, res) => {
  const { name, progress, imageIds } = req.body;
  try {
    // db에서 이미지 정보 찾기
    const imageObjects = [];
    for (const imageId of imageIds) {
      const image = await imageModel.findOne({ _id: imageId });
      imageObjects.push(image);
    }
    // fs.writeFileSync("imageObjects.txt", imageObjects.toString());
    // console.log(imageObjects);
    // return;
    try {
      // fastapi에 api 콜해서 클러스터링 결과 받아오기
      const clusterRes = await axios.post(
        `${loadenv.embeddingUrl}/clustering`,
        {
          images: imageObjects,
        }
      );
      // 일단 연속 사진이 없는 경우
      const { cluster, startTime, endTime } = clusterRes;
      const pins = [];
      for (const subcluster of cluster) {
        const subpin = [];
        for (const pinelem of subcluster) {
          let pinElement = new pinElement({
            mainImage: pinelem[0].mainImage,
            vector: pinelem[0].vector,
            images: pinelem[0].images,
          });
          await pinElement.save();
          subpin.push(pinElement._id);
        }
        let pin = new pinModel({
          name: "",
          note: "",
          startTime: subpin[0].images[0].time.toString(),
          endTime: subpin[subpin.length - 1].images[0].time.toString(),
          mainImage: subpin[0].images[0],
          imageSets: subpin,
        });
        await pin.save();
        pins.push(pin._id);

        const user = await userModel
          .findOne({ id: req.userId })
          .populate("trips");

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
        return res.send(trip._id); // trip._id send
      }
    } catch (error) {
      console.log(error);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Trip/create : internal server error",
    });
    return;
  }
};

// createHandler(
//   {
//     body: {
//       name: "test여행",
//       progress: true,
//       imageIds: [
//         "63d511606208c55a1c7397f0",
//         "63d511636208c55a1c7397f5",
//         "63d511656208c55a1c7397fa",
//         "63d511676208c55a1c7397ff",
//         "63d511696208c55a1c739804",
//         "63d5116a6208c55a1c739809",
//         "63d5116c6208c55a1c73980e",
//         "63d5116f6208c55a1c739813",
//         "63d511716208c55a1c739818",
//         "63d511746208c55a1c73981d",
//         "63d511756208c55a1c739822",
//         "63d511776208c55a1c739827",
//         "63d511786208c55a1c73982c",
//         "63d5117a6208c55a1c739831",
//         "63d5117c6208c55a1c739836",
//         "63d5117e6208c55a1c73983b",
//         "63d511806208c55a1c739840",
//         "63d511816208c55a1c739845",
//         "63d511836208c55a1c73984a",
//         "63d511856208c55a1c73984f",
//         "63d511876208c55a1c739854",
//         "63d5118a6208c55a1c739859",
//         "63d5118c6208c55a1c73985e",
//         "63d5118f6208c55a1c739863",
//         "63d511916208c55a1c739868",
//         "63d511946208c55a1c73986d",
//         "63d511956208c55a1c739872",
//         "63d511986208c55a1c739877",
//         "63d5119a6208c55a1c73987c",
//         "63d5119c6208c55a1c739881",
//         "63d5119e6208c55a1c739886",
//         "63d511a06208c55a1c73988b",
//         "63d511a26208c55a1c739890",
//         "63d511a46208c55a1c739895",
//         "63d511a66208c55a1c73989a",
//         "63d511a86208c55a1c73989f",
//         "63d511aa6208c55a1c7398a4",
//         "63d511ac6208c55a1c7398a9",
//         "63d511ae6208c55a1c7398ae",
//         "63d511b06208c55a1c7398b3",
//         "63d511b26208c55a1c7398b8",
//         "63d511b56208c55a1c7398bd",
//         "63d511b66208c55a1c7398c2",
//         "63d511b86208c55a1c7398c7",
//         "63d511ba6208c55a1c7398cc",
//         "63d511bc6208c55a1c7398d1",
//         "63d511be6208c55a1c7398d6",
//         "63d511bf6208c55a1c7398db",
//         "63d511c26208c55a1c7398e0",
//         "63d511c46208c55a1c7398e5",
//         "63d511c66208c55a1c7398ea",
//         "63d511c86208c55a1c7398ef",
//         "63d511ca6208c55a1c7398f4",
//         "63d511cc6208c55a1c7398f9",
//         "63d511cd6208c55a1c7398fe",
//         "63d511ce6208c55a1c739903",
//         "63d511d16208c55a1c739908",
//         "63d511d26208c55a1c73990d",
//         "63d511d46208c55a1c739912",
//         "63d511d66208c55a1c739917",
//         "63d511d86208c55a1c73991c",
//         "63d511da6208c55a1c739921",
//         "63d511dc6208c55a1c739926",
//         "63d511dd6208c55a1c73992b",
//         "63d511df6208c55a1c739930",
//       ],
//     },
//   },
//   { json: console.log }
// );

const pinlistHandler = async (req, res) => {
  try {
    const user = await userModel.findOne({ id: req.userId }).populate("pins");
    res.send(user.pins);
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
