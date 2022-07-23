export const getCurrentTabUrl = (callback) => {
  chrome.windows.getCurrent((w) => {
    const queryInfo = { active: true, windowId: w.id };
    chrome.tabs.query(queryInfo, (tabs) => {
      callback(tabs[0].url);
    });
  });
};

export const getCurrentTabUId = (callback) => {
  chrome.windows.getCurrent((w) => {
    const queryInfo = { active: true, windowId: w.id };
    chrome.tabs.query(queryInfo, (tabs) => {
      callback(tabs[0].id);
    });
  });
};
