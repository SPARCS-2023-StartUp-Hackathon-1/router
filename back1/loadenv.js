require("dotenv").config({ path: `./.env.${process.env.NODE_ENV}` });

module.exports = {
  nodeEnv: process.env.NODE_ENV,
  mongo: process.env.DB_PATH,
  port: process.env.PORT,
  frontUrl: process.env.FRONT_URL,
};
