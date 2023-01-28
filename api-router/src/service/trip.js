const loadenv = require("../../loadenv");
const {
  userModel,
  tripModel,
  imageModel,
  pinModel,
} = require("../modules/mongo");

const createHandler = async (req, res) => {
  const { name, progress, imageIds } = req.body;
  try {
    // db에서 이미지 정보 찾기
    const imageObjects = [];
    for (const imageId of imageIds) {
      const image = await imageModel.findOne({ id: imageId });
      imageObjects.push(image);
    }

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

module.exports = {
  createHandler,
  pinlistHandler,
};
