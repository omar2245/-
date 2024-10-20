import axios from "axios";
import { ElMessage } from "element-plus";
import config from "./config";

const service = axios.create({
  baseURL: config.baseApi,
});
const NETWORK_ERROR = "網路錯誤...";

service.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
service.interceptors.response.use((res) => {
  const { code, data, msg } = res.data;
  if (code === 200) {
    return res.data;
  } else {
    ElMessage.error(msg || NETWORK_ERROR);
    return Promise.reject(msg || NETWORK_ERROR);
  }
});

function request(options) {
  options.method = options.method || "get";

  if (options.method === "get" || options.method === "delete") {
    options.params = options.data;
  }

  if (config.env === "product") {
    service.defaults.baseURL = config.baseApi;
  } else {
    service.defaults.baseURL = config.mock ? config.mockApi : config.baseApi;
  }

  return service(options);
}

export default request;
