const { request } = require("express");
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
        console.error(err);
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
      console.log(key);
      console.log(err);
      console.log(data);
      if (err) return res.json({ result: false });
      // ToDo : 이미지 정보 추출 됬는지
      // ToDo : 이미지 추출 정보 저장

      // ToDo : test post cost
      const options = {
        uri: "http://router.hackathon.sparcs.org:8080/extract",
        method: "POST",
        body: {
          imageUrl: key,
        },
        json: true,
      };
      request.post(options, function (body) {
        console.log(body);
        const { datetime, latitude, logitude, vector } = body;
        image["time"] = datetime;
        image["latitude"] = latitude;
        image["logitude"] = logitude;
        image["vector"] = vector;
      });
      res.json({ result: true });
    });
    await image.save();
  } catch (e) {
    console.log(e);
    res.status(500).send("internal server error");
  }
});

module.exports = router;
