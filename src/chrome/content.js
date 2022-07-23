const validateSender = (sender) => {
  return sender.id === chrome.runtime.id;
};

const messagesFromReactAppListener = (message, sender, response) => {
  const isValidated = validateSender(sender);

  console.log(message, sender);

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
