require("dotenv").config({ path: `./.env` });

module.exports = {
  nodeEnv: process.env.NODE_ENV,
  mongo: process.env.MONGO_PATH,
  redis: process.env.REDIS_PATH,
  embeddingUrl: process.env.API_EMBEDDING_URL,
  port: process.env.PORT,
  session: process.env.SESSION_KEY,
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    s3BucketName: process.env.AWS_S3_BUCKET_NAME,
  },
};
