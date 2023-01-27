require("dotenv").config({ path: `./.env` });

module.exports = {
  nodeEnv: process.env.NODE_ENV,
  mongo: process.env.MONGO_PATH,
  redis: process.env.REDIS_PATH,
  port: process.env.PORT,
  frontUrl: process.env.FRONT_URL,
  session: process.env.SESSION_KEY,
};
