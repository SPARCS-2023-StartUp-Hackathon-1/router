const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema({
  id: { type: String, required: true },
  nickname: { type: String, required: true },
  friends: [{ type: Schema.Types.ObjectId }],
  trips: [{ type: Schema.Types.ObjectId, ref: "Trip" }],
});

const tripSchema = Schema({
  name: { type: String, required: true, text: true },
  range: { type: String, required: true, text: true },
  progress: { type: Boolean, default: true }, // default progress true
  pins: [{ type: Schema.Types.ObjectId, ref: "Pin" }],
});

const pinElementSchema = Schema({
  mainImage: { type: String, require: true },
  images: [{ type: Schema.Types.ObjectId, ref: "Image" }],
});

const pinSchema = Schema({
  name: { type: String, required: true, text: true },
  memo: { type: String, required: true, text: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  mainImage: { type: String, require: true }, // 백엔드에서 이미지 경로
  images: [pinElementSchema], // Pinelement type 만들기
});

const imageSchema = Schema({
  time: { type: Date, required: true },
  url: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
});

const database = mongoose.connection;
database.on("error", console.error.bind(console, "mongoose connection error."));
database.on("open", () => {
  logger.info("데이터베이스와 연결되었습니다.");
});
database.on("error", function (err) {
  logger.error("데이터베이스 연결 에러 발생: " + err);
  mongoose.disconnect();
});

mongoose.connect(loadenv.mongo, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = {
  userModel: mongoose.model("User", userSchema),
  tripModel: mongoose.model("Trip", tripSchema),
  pinModel: mongoose.model("Pin", pinSchema),
  imageModel: mongoose.model("Image", imageSchema),
};
