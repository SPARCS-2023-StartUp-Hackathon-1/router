const { userModel, pinModel } = require("../modules/mongo");

const triplistHandler = async (req, res) => {
  try {
    const user = await userModel
      .findOne({ id: req.params.userId })
      .populate("trips");
    // user.pins[0]

    // const pin = await pinModel.findOne({_id: user.})
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
