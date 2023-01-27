// 외부 모듈 require
const express = require("express");
const http = require("http");

const cookieParser = require("cookie-parser");
const cors = require("cors");

// 내부 모듈
const loadenv = require("./loadenv");

// 익스프레스 서버 생성
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

// 세션 및 쿠키
const session = require("./src/middleware/session");
app.use(session);
app.use(cookieParser());

// 라우터 및 리액트
app.use("/auth", require("./src/route/auth"));
app.use("/user", require("./src/route/user"));
app.use("/trip", require("./src/route/trip"));
app.use("/pin", require("./src/route/pin"));
app.use("/image", require("./src/route/image"));

// express 서버 시작
const serverHttp = http.createServer(app).listen(loadenv.port, () => {
  console.log(`Express 서버가 ${loadenv.port}번 포트에서 시작됨.`);
});
