// const loadenv = require("../../loadenv");
const { userModel } = require("../modules/mongo");
const { logout, login, getLoginInfo, isLogin } = require("../auth/login");

const makeInfo = (id, nickname) => {
  const info = {
    id: id,
    nickname: nickname,
    friends: [],
    trips: [],
  };
  return info;
};

const joinus = (req, res, userData) => {
  const newUser = new userModel({
    id: userData.id,
    nickname: userData.nickname,
    friends: userData.friends,
    trips: userData.trips,
  });
  newUser.save((err) => {
    if (err) {
      console.log(err);
      return;
    }
    loginComplete(req, res, userData);
  });
};

const loginComplete = (req, res, userData) => {
  userModel.findOne({ id: userData.id }, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("internal server error");
    }

    // FIXME - joinus
    if (!result) return joinus(req, res, userData);

    login(req, result.id, result.nickname);
    res.send("ok login");
  });
};

const tryHandler = (req, res) => {
  const id = req.body.id;
  const nickname = req.body.nickname;
  loginComplete(req, res, makeInfo(id, nickname));
};

const logoutHandler = (req, res) => {
  logout(req, res);
  res.status(200).send("logout successfully");
};

const logininfoHandler = (req, res) => {
  const user = getLoginInfo(req);
  res.json(user);
};

module.exports = {
  tryHandler,
  logoutHandler,
  logininfoHandler,
};
