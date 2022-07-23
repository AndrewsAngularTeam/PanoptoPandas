const validateSender = (sender) => {
  return sender.id === chrome.runtime.id;
};

const messagesFromReactAppListener = (message, sender, response) => {
  const isValidated = validateSender(sender);

  console.log(message, sender);
  if (message.message === "LoadEventHandlers") {
    const video = document.getElementById("secondaryVideo");
    console.log(video);
    if (video) {
      video.addEventListener("play", (event) => {
        console.log("Event for PLAY", event);
        message.play();
      });
      video.addEventListener("pause", message.pause);
    }
    response("Event listeners added");
  }

  if (message.message === "Hello from React") {
    response("Hello from content.js");
  }

  if (!isValidated) {
    console.error("[content.js] messagesFromReactAppListener: sender is not valid");
    return;
  }
};

const main = () => {
  console.log("[content.js] Main");
  /**
   * Fired when a message is sent from either an extension process or a content script.
   */
  chrome.runtime.onMessage.addListener(messagesFromReactAppListener);
};

main();
