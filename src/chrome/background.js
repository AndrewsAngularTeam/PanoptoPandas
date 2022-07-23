export {};
/** Fired when the extension is first installed,
 *  when the extension is updated to a new version,
 *  and when Chrome is updated to a new version. */
chrome.runtime.onInstalled.addListener((details) => {
  console.log("[background.js] onInstalled", details);
});

chrome.runtime.onConnect.addListener((port) => {
  console.log("[background.js] onConnect", port);
});

chrome.runtime.onStartup.addListener(() => {
  console.log("[background.js] onStartup");
});

// This is for background receiving a message from a content script?
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(message);
  if (message.type === "PLAY") {
    console.log("VIDEO PLAYING");
    sendResponse("VIDEO PLAY RECEIVED");
  } else if (message.type === "PAUSE") {
    console.log("VIDEO PAUSED");
    sendResponse("VIDEO PAUSE RECEIVED");
  } else {
    console.log("NOT RECOGNISED");
    sendResponse("EVEN NOT RECOGNISED");
  }
});

function setupVideoEventHandler() {
  const video = document.getElementById("secondaryVideo");
  console.log(video);
  if (video) {
    video.addEventListener("play", (event) => {
      console.log(event);
      chrome.runtime.sendMessage({ type: "PLAY" }, function (response) {
        console.log("RESPONSE: ", response);
      });
    });
    video.addEventListener("pause", (event) => {
      console.log(event);
      chrome.runtime.sendMessage({ type: "PAUSE" }, function (response) {
        console.log("RESPONSE: ", response);
      });
    });
  }
}

/**
 *  Sent to the event page just before it is unloaded.
 *  This gives the extension opportunity to do some clean up.
 *  Note that since the page is unloading,
 *  any asynchronous operations started while handling this event
 *  are not guaranteed to complete.
 *  If more activity for the event page occurs before it gets
 *  unloaded the onSuspendCanceled event will
 *  be sent and the page won't be unloaded. */
chrome.runtime.onSuspend.addListener(() => {
  console.log("[background.js] onSuspend");
});
