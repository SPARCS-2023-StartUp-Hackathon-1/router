const { userModel } = require("../modules/mongo");

const triplistHandler = async (req, res) => {
  try {
    const user = await userModel.findOne({ id: req.userId }).populate("trips");
    res.send(user.trips);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "User/triplist: internal server error",
    });
  }
};

module.exports = {
  triplistHandler,
};
