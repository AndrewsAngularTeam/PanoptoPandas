import { axiosInstance } from "./axiosInstance";
import { getCurrentTabUId } from "../chrome/utils";

const USER_ID_KEY = "userId";

const getUserId = () => {
  const message = {
    type: "getUserId",
  };

  return new Promise((resolve, reject) => {
    getCurrentTabUId((id) => {
      id &&
        chrome.tabs.sendMessage(id, message, (response) => {
          resolve(response);
        });
    });
  });
};

const setUserId = (id) => {
  const message = {
    type: "setUserId",
    value: id,
  };

  return new Promise((resolve, reject) => {
    getCurrentTabUId((id) => {
      id &&
        chrome.tabs.sendMessage(id, message, (response) => {
          resolve(response);
        });
    });
  });
};

const getLeaderboard = async () => {
  const response = await axiosInstance.get("/leaderboard");
  const data = response.data;
  return data;
};

// Marketplace to get user's coin
const getCurrentUser = async () => {
  const userId = await getUserId();
  const response = await axiosInstance.get(`/user/${userId}`);
  const data = response.data;
  return data;
};

// Marketplace to get user's coin
const getUser = async (userId) => {
  const response = await axiosInstance.get(`/user/${userId}`);
  const data = response.data;
  return data;
};

// For the switch in settings
const updateUserPrivateMode = async (privateModeOn) => {
  const userId = await getUserId();
  const response = await axiosInstance.post(`/user/${userId}/updatePrivateMode`, {
    privateMode: privateModeOn,
  });
  const data = response.data;
  return data;
};

// For when user selects an item to equip
const updateUserSelectedItem = async (itemId) => {
  const userId = await getUserId();
  const response = await axiosInstance.post(`/shop/selectItem`, {
    userId: userId,
    itemId: itemId,
  });
  const data = response.data;
  return data;
};

// For Flynn to send current watch time in minutes
const increaseUserTime = async (miniutes) => {
  const userId = await getUserId();
  const response = await axiosInstance.post(`/user/${userId}/addTime`, {
    minutes: miniutes,
  });
  const data = response.data;
  return data;
};

// When you login with Firebase you need to create record of the new user on backend
const createUser = async (name, id) => {
  const response = await axiosInstance.post(`/user/create`, {
    name: name,
    id: id,
  });
  const data = response.data;
  await setUserId(id);
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

// Onclick, buy item. Front end should check for sufficient balance first. Backend also checks and will return 400 if there's a error.
const purchaseItem = async (itemId) => {
  const userId = await getUserId();
  const response = await axiosInstance.post(`/shop/purchaseItem`, {
    userId: userId,
    itemId: itemId,
  });
  const data = response.data;
  return data;
};

export {
  getLeaderboard,
  getUser,
  getCurrentUser,
  updateUserPrivateMode,
  updateUserSelectedItem,
  increaseUserTime,
  createUser,
  getAllItems,
  getSpecificTypeOfItems,
  purchaseItem,
};
