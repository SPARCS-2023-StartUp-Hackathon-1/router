const { tripModel, pinModel, pinElementModel } = require("../modules/mongo");

const pincreateHandler = async (req, res) => {
  const { name, note, startTime, endTime } = req.body; // startTime, endTime front 에서? 아니면 가져온 사진들애소 츄츌

  try {
    // trip/create api 안에서 클러스터링 된 이차원 배열들로 호출
    //각각의 pin에 대해서 pin element 생성, 생성된 pinelements imageset에 할당, 저장

    const trip = await tripModel.findOne({ id: req.tripId }).populate("pins"); // find trip by req tripId

    // 추가작업 #####cluster = cluster api에서 응답######

    for (subcluster of cluster) {
      const subpin = [];
      for (pinelem of subcluster) {
        let pinElement = new pinElement({
          mainImage: pinelem["mainImage"],
          vector: pinelem["vector"],
          images: pinelem["images"],
        });
        await pinElement.save();
        subpin.push(pinElement._id);
      }
      let pin = new pinModel({
        name: name,
        note: note,
        startTime: startTime,
        endTime: endTime,
        mainImage: subpin[0].images[0], // first image,
        imageSets: subpin,
      });
      await pin.save();
      trip.pins.push(pin._id);
      await trip.save();
    }
    res.send("make pins successfully");
  } catch (err) {
    res.status(500).json({
      error: "Trip/create : internal server error",
    });
    return;
  }
};

const infoHandler = async (req, res) => {
  try {
    const pin = await pinModel.findOne({ _id: req.params.pinId }).lean();
    console.log(pin);
    const imageIds = []; // pin에 저장된 pinElement들을 front에서 구현하기 편하게 하나의 imageIds 이중리스트로 제공
    for (const pinElemId of pin.imageSets) {
      const pinElem = await pinElementModel.findOne({
        _id: pinElemId,
      });
      imageIds.push(pinElem.images);
    }
    console.log(imageIds);
    // send pin과, pin에 해당하는 클러스터 완료된 사진 ids
    res.send({ pin, imageIds });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "pins/info : internal server error",
    });
  }
};

module.exports = {
  pincreateHandler,
  infoHandler,
};
