export const getCurrentTabUrl = (callback) => {
  const queryInfo = { active: true, lastFocusedWindow: true };

  chrome.tabs &&
    chrome.tabs.query(queryInfo, (tabs) => {
      callback(tabs[0].url);
    });
};

export const getCurrentTabUId = (callback) => {
  const queryInfo = { active: true, lastFocusedWindow: true };

  chrome.tabs &&
    chrome.tabs.query(queryInfo, (tabs) => {
      console.log(tabs);
      callback(tabs[0].id);
    });
};
