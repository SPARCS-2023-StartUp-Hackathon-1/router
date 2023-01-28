const env = { ...process.env, ...window["env"] };

const nodeEnv = env.NODE_ENV;
const apiRouterUrl = env.REACT_APP_API_ROUTER_URL;
const s3Url = env.REACT_APP_S3_URL;

export { nodeEnv, apiRouterUrl, s3Url };
