const axios = require("axios").default;

const axiosInstance = axios.create({
  baseURL: "https://aat-backend.herokuapp.com",
});

module.exports = {
  axiosInstance,
};
