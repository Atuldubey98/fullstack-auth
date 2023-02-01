import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:3000",
});

instance.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Bearer ${JSON.parse(
      localStorage.getItem("token")
    )}`;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 403) {
      window.location.replace("/login");
    }
    return Promise.reject(error);
  }
);

export default instance;
