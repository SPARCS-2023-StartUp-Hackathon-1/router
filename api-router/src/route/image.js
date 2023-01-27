const express = require("express");
const awsS3 = require("../modules/awsS3");
const { imageModel } = require("../modules/mongo");

const router = express.Router();

// 이미지를 업로드할 수 있는 presigned-url을 발급합니다.
/*
 request: {
   "type": "image/png" | "image/jpg" | "image/jpeg",
 }
 response: {
   "id": <Image object ID>,
   "url": <Presigned URL>,
   "fields": <>,
 }
 */
router.post("/upload/getPUrl", async (req, res) => {
  try {
    const type = req.body.type;
    const imageDoc = new imageModel({
      valid: false,
    });
    const image = await imageDoc.save();
    const key = `image-ori/${image._id}`;
    awsS3.getUploadPUrlPost(key, type, (err, data) => {
      if (err) {
        console.error(e);
        return res.status(500).send("internal server error");
      }
      data.fields["Content-Type"] = type;
      data.fields["key"] = key;
      res.json({
        id: image._id,
        url: data.url,
        fields: data.fields,
      });
    });
  } catch (e) {
    console.error(e);
    res.status(500).send("internal server error");
  }
});

// 이미지가 S3에 정상적으로 업로드가 되었는지 확인합니다.
/*
 request: {
   "id": String, // 이미지 id
 }
 response: {
   "result": Boolean
 }
 */
router.post("/upload/complete", async (req, res) => {
  try {
    const image = await imageModel.findById(req.body.id);
    if (!image) return res.status(404).send("not-found corresponding image");
    if (image.valid)
      return res.status(404).send("not-found corresponding image");

    const key = `image-ori/${image._id}`;
    awsS3.foundObject(key, (err, data) => {
      if (err) return res.json({ result: false });
      // ToDo : 이미지 정보 추출 됬는지
      // ToDo : 이미지 추출 정보 저장
      res.json({ result: true });
    });
  } catch (e) {
    console.log(e);
    res.status(500).send("internal server error");
  }
});

module.exports = router;
