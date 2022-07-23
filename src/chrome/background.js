import { clearTimeout } from "timers";

export {};

// the payout time period in seconds
const PAYOUT_TIME_PERIOD = 10000;

let payTimeoutId = -1;
let lastIntervalTime = 0;
let remainingTime = 0;

function handlePlay() {
  console.log("Handle play called");
  if (payTimeoutId !== 0) {
    payTimeoutId = window.setTimeout(triggerPandaPayout, PAYOUT_TIME_PERIOD);
  } else {
    payTimeoutId = window.setTimeout(triggerPandaPayout, remainingTime);
  }
}

function handlePause() {
  let pauseTime = Date.now();
  clearTimeout(payTimeoutId);
  let timePassed = Math.floor((pauseTime - lastIntervalTime) / 1000);
  console.log("timePassed: ", timePassed);
  remainingTime = PAYOUT_TIME_PERIOD - timePassed;
  console.log("remainingTime: ", remainingTime);
  payTimeoutId = 0;
}

function triggerPandaPayout() {
  lastIntervalTime = Date.now();
  console.log("CONGRATS HERE IS 10 PANDA BUCKS");
  // Trigger a pop up box that the user needs to click to send a post to the backedn
  // This will increment the users pandabucks by 50, every 5 minutes
  payTimeoutId = window.setTimeout(triggerPandaPayout, PAYOUT_TIME_PERIOD);
}

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
    handlePlay();
    sendResponse("VIDEO PLAY RECEIVED");
  } else if (message.type === "PAUSE") {
    console.log("VIDEO PAUSED");
    handlePause();
    sendResponse("VIDEO PAUSE RECEIVED");
  } else {
    console.log("NOT RECOGNISED");
    sendResponse("EVEN NOT RECOGNISED");
  }
});

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
