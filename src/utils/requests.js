import { axiosInstance } from "./axiosInstance";

const USER_ID_KEY = "userId";

const getUserId = () => {
  return localStorage.getItem(USER_ID_KEY);
};

const setUserId = (id) => {
  localStorage.setItem(USER_ID_KEY, id);
};

const getLeaderboard = async () => {
  const response = await axiosInstance.get("/leaderboard");
  const data = response.data;
  return data;
};

const getCurrentUser = async () => {
  const userId = getUserId();
  const response = await axiosInstance.get(`/user/${userId}`);
  const data = response.data;
  return data;
};

const updateUserPrivateMode = async (privateModeOn) => {
  const userId = getUserId();
  const response = await axiosInstance.post(`/user/${userId}/updatePrivateMode`, {
    privateMode: privateModeOn,
  });
  const data = response.data;
  return data;
};

const updateUserSelectedItem = async (itemId) => {
  const userId = getUserId();
  const response = await axiosInstance.post(`/shop/selectItem`, {
    userId: userId,
    itemId: itemId,
  });
  const data = response.data;
  return data;
};

const increaseUserTime = async (miniutes) => {
  const userId = getUserId();
  const response = await axiosInstance.post(`/user/${userId}/addTime`, {
    minutes: miniutes,
  });
  const data = response.data;
  return data;
};

const createUser = async (name, id) => {
  const response = await axiosInstance.post(`/user/create`, {
    name: name,
    id: id,
  });
  const data = response.data;
  setUserId(id);
  return data;
};

const getAllItems = async () => {
  const response = await axiosInstance.get(`/shop`);
  const data = response.data;
  return data;
};

const getSpecificTypeOfItems = async (type = "model") => {
  const response = await axiosInstance.get(`/shop/${type}`);
  const data = response.data;
  return data;
};

const purchaseItem = async (itemId) => {
  const userId = getUserId();
  const response = await axiosInstance.post(`/shop/purchaseItem`, {
    userId: userId,
    itemId: itemId,
  });
  const data = response.data;
  return data;
};

export {
  getLeaderboard,
  getCurrentUser,
  updateUserPrivateMode,
  updateUserSelectedItem,
  increaseUserTime,
  createUser,
  getAllItems,
  getSpecificTypeOfItems,
  purchaseItem,
};
