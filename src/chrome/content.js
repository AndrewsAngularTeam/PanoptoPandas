const messagesFromReactAppListener = (message, sender, response) => {
  console.log("[content.js]. Message received", {
    message,
    sender,
  });

  if (message.message === "Hello from React") {
    response("Hello from content.js");
  }

  if (message.message === "delete logo") {
    const logo = document.getElementsByClassName("k1zIA");
    if (logo.length !== 0) {
      const logoZero = logo[0];
      logoZero.parentElement?.removeChild(logoZero);
      console.log("Found logo element");
    }
  }
};

/**
 * Fired when a message is sent from either an extension process or a content script.
 */
chrome.runtime.onMessage.addListener(messagesFromReactAppListener);
