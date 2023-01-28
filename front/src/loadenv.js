import dotenv from "dotenv";

dotenv.config();

const env = { ...process.env, ...window["env"] };

const nodeEnv = env.NODE_ENV;
const apiRouterUrl = env.REACT_APP_API_ROUTER_URL;

export { nodeEnv, apiRouterUrl };
