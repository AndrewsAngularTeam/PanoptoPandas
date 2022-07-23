const messagesFromReactAppListener = (message, sender, response) => {
  console.log(message.type, message);

  if (message.type === "inject") {
    console.log("inject")
    injectIFrame();
    response("injected");
    return
  }
};

const injectIFrame = () => {
  const id = "vtuber-iframe-chrome-extension"

  const frame = document.getElementById(id);
  if (frame !== undefined && frame !== null) {
    frame.remove()
  }

  let iframe = document.createElement("iframe");
  iframe.id = id
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


  let video = document.body.getElementsByClassName("player-layout-controls-container")
  console.log(video)

  if (video.length === 0) {
    console.log("no video")
    document.body.appendChild(iframe);
    return 
  }

  video[0].appendChild(iframe);

}

const main = () => {
  console.log("[content.js] Main");
  /**
   * Fired when a message is sent from either an extension process or a content script.
   */
  chrome.runtime.onMessage.addListener(messagesFromReactAppListener);
};

main();
