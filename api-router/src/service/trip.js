const { userModel, tripModel } = require("../modules/mongo");

const createHandler = async (req, res) => {
  const { name, startTime, endTime, progress, pins } = req.body;
  try {
    const user = await userModel.findOne({ id: req.userId }).populate("trips");
    let trip = new tripModel({
      name: name,
      startTime: startTime,
      endTime: endTime,
      progress: progress, // ongoing 인지 done인지 어떻게 구별? => front 에서 받아와서 보내줌
      pins: [], //  pins에는 clustering 한 결과 넣어줘야함, front의 pins 에는 그냥 사진들을 쭉 받아오는걸로?
    });
    await trip.save();

    user.trips.push(trip._id);
    await user.save();
    return res.send(trip); // format 필요할지도?
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
