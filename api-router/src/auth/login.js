const getLoginInfo = (req) => {
  if (req.session.loginInfo) {
    const { id, nickname, time } = req.session.loginInfo;
    const timeFlow = Date.now() - time;
    if (timeFlow > 14 * 24 * 3600 * 1000)
      return { id: undefined, nickname: undefined };
    else {
      req.session.loginInfo.time = Date.now();
      return { id, nickname };
    }
  } else return { id: undefined, nickname: undefined };
};

const isLogin = (req) => {
  const loginInfo = getLoginInfo(req);
  if (loginInfo.id) return true;
  else return false;
};

const login = (req, id, nickname) => {
  req.session.loginInfo = { id, nickname, time: Date.now() };
};

const logout = (req) => {
  req.session.destroy((err) => {
    if (err) console.log(err);
  });
};

module.exports = {
  getLoginInfo,
  isLogin,
  login,
  logout,
};
