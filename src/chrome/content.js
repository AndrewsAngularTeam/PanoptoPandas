const USER_ID_KEY = "userId";

const messagesFromReactAppListener = (message, sender, response) => {
  console.log("[content.js] received Message:", message);

  if (message.type === "inject") {
    console.log("inject");
    injectIFrame();
    response("injected");
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

const injectIFrame = () => {
  const id = "vtuber-iframe-chrome-extension";

  const frame = document.getElementById(id);
  if (frame !== undefined && frame !== null) {
    frame.remove();
  }

  let iframe = document.createElement("iframe");
  iframe.id = id;
  iframe.src = "chrome-extension://" + chrome.runtime.id + "/options.html";
  iframe.title = "vtuber";
  iframe.frameBorder = "0";
  iframe.allowTransparency = true;
  iframe.style.backgroundColor = "transparent";

  iframe.style.position = "absolute";
  iframe.style.bottom = "0";
  iframe.style.right = "0";
  iframe.style.height = "200px";
  iframe.style.width = "180px";

  let video = document.body.getElementsByClassName("player-layout-controls-container");
  console.log(video);

  if (video.length === 0) {
    console.log("no video");
    document.body.appendChild(iframe);
    return;
  }

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
};

main();
