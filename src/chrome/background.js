import { getCurrentTabUId } from "./utils";

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

const populateComments = () => {
  const ID = "primaryPlayer";
  const element = document.getElementById(ID);
  let commentOverlay = element.querySelector(".comment-overlay");
  if (commentOverlay == null) {
    commentOverlay = document.createElement("div");
    commentOverlay.classList.add("comment-overlay");
    commentOverlay.style.color = "white";
    commentOverlay.style.position = "absolute";
    commentOverlay.style.bottom = "0";
    element.appendChild(commentOverlay)
  }
  console.log(commentOverlay);
  const newElement = document.createElement("div");
  newElement.innerText = "uwu";
  newElement.style.transition = "transform 30s linear"
  newElement.style.transform = "TranslateX(-100%)";
  newElement.style.top = String(Math.random() * 100) + "%";
  newElement.style.position = "absolute";
  commentOverlay.appendChild(newElement);
  setTimeout(() => {
    newElement.style.transform = "TranslateX(100vw)";
  }, 1_000)
}

console.log("vibing");

setTimeout(
  () => getCurrentTabUId(uid => chrome.scripting.executeScript({
    target: {tabId: uid},
    func: populateComments,
  })), 5_000
)
