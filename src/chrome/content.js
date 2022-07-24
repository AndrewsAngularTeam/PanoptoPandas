import { volume, initVideoObservers, getJungle } from "./video";

const USER_ID_KEY = "userId";

const messagesFromReactAppListener = (message, sender, response) => {
  if (message.type === "inject") {
    console.log("[content.js] inject");
    injectIFrame(message.vrmUrl);
    response("injected");
    return;
  }

  if (message.type === "volume") {
    response(volume);
    return;
  }

  if (message.type === "setUserId") {
    response(localStorage.setItem(USER_ID_KEY, message.value));
    return;
  }
  if (message.type === "getUserId") {
    response(localStorage.getItem(USER_ID_KEY));
    return;
  }

  if (message.type === "pitch") {
    console.log("[content.js] pitch, value:", message.value);
    getJungle().setPitchOffset(message.value, false);
    response("pitch");
    return;
  }
};

/**
 * @param {string} cookie
 * @param {string} key
 * @return {string}
 */
const findCookie = (cookie, keyToFind) => {
  console.log("[content.js] find cookie function");
  const cookieList = cookie.split(";");
  for (const cookiePair of cookieList) {
    const [key, value] = cookiePair.split("=");
    if (key.includes(keyToFind)) {
      return key.replace(keyToFind, "").trim();
    }
  }
  return undefined;
};

const findAndSetUserId = () => {
  console.log("[content.js] attempt to find user");
  const userId = findCookie(document.cookie, "unified\\");
  if (userId === undefined) {
    return;
  }
  console.log("[content.js] found user id", userId);
  window.localStorage.setItem(USER_ID_KEY, userId);
};

const injectIFrame = (vrmUrl) => {
  const id = "vtuber-iframe-chrome-extension";

  const frame = document.getElementById(id);
  if (frame !== undefined && frame !== null) {
    frame.remove();
  }

  let iframe = document.createElement("iframe");
  iframe.id = id;

  if (vrmUrl) {
    const encodedVrmUrl = encodeURIComponent(vrmUrl);

    iframe.src = "chrome-extension://" + chrome.runtime.id + "/options.html?vrm=" + encodedVrmUrl;
  } else {
    iframe.src = "chrome-extension://" + chrome.runtime.id + "/options.html";
  }

  iframe.title = "vtuber";
  iframe.frameBorder = "0";
  iframe.allowTransparency = true;
  iframe.style.backgroundColor = "transparent";

  iframe.style.zIndex = "1000";
  iframe.style.bottom = "0";
  iframe.style.right = "0";
  iframe.style.height = "35vh";
  iframe.style.width = "25vh";
  iframe.style.minHeight = "200px";
  iframe.style.minWidth = "180px";
  iframe.style.resize = "both";
  iframe.style.overflow = "auto";

  let video = document.body.getElementsByClassName("player-layout-controls-container");

  if (video.length === 0) {
    console.log("[content.js] no video");
    iframe.style.position = "fixed";
    document.body.appendChild(iframe);
    return;
  }

  iframe.style.position = "absolute";
  video[0].appendChild(iframe);
};

const main = () => {
  console.log("[content.js] Main");

  if (window.localStorage.getItem(USER_ID_KEY) === null) {
    findAndSetUserId();
  }
  /**
   * Fired when a message is sent from either an extension process or a content script.
   */
  chrome.runtime.onMessage.addListener(messagesFromReactAppListener);
  initVideoObservers();
};

main();
