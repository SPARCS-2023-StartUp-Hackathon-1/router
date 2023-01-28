import _axios from "axios";
import { apiRouterUrl } from "loadenv";

const axios = _axios.create({ baseURL: apiRouterUrl, withCredentials: true });

export default axios;
