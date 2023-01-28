const { userModel, tripModel } = require("../modules/mongo");
const pincreateHandler = require("../service/pin");

const createHandler = async (req, res) => {
  const { name, progress, imageIds } = req.body;
  try {
    // cluster api 에서 반환하는 return data [pin[pinElements]]
    // 받아온 리스트에 대해 pin/create 호출 그 안에서 [pinElement 생성]
    // 각각의 pin을 trip의 pins[]에 저장
    // 그 객체를 trip의 pins로

    const user = await userModel.findOne({ id: req.userId }).populate("trips");
    let trip = new tripModel({
      name: name,
      // startTime: startTime,
      // endTime: endTime,
      progress: progress,
      pins: [], //  pins에는 clustering 한 결과 넣어줘야함, front의 pins 에는 그냥 사진들을 쭉 받아오는걸로?
    });

    // 추가작업 #####call pin/create api#####

    await trip.save();

    user.trips.push(trip._id);
    await user.save();
    return res.send(trip._id); // trip._id send
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
