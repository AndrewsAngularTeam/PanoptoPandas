import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://aat-backend.herokuapp.com",
});

export { axiosInstance };
