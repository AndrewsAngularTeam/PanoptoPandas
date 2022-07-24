console.log("[panoptoPage.js] Loading content script");

const USER_ID_KEY = "userId";
let userID = "";
let isLoggedIn = false;

function checkIfLoggedIn() {
  userID = localStorage.getItem(USER_ID_KEY);
  if (userID !== null && userID !== "") {
    console.log("[panoptoPages.js] user found: ", userID);
    isLoggedIn = true;
    return;
  }
  console.log("[panoptoPage.js] userID not found");
  isLoggedIn = false;
}

// the payout time period in seconds
const PAYOUT_TIME_PERIOD_MS = 5000;
const PAYOUT_TIME_PERIOD_MIN = PAYOUT_TIME_PERIOD_MS / 60000;

let payTimeoutId = -1;
let lastIntervalTime = 0;
let remainingTime = 10000;
let isRunning = false;

function handlePlay() {
  lastIntervalTime = Date.now();
  checkIfLoggedIn();
  console.log("[panoptoPage] user is logged in: ", isLoggedIn);
  updatePopup();
  isRunning = true;
  if (payTimeoutId !== 0) {
    payTimeoutId = setTimeout(triggerPandaPayout, PAYOUT_TIME_PERIOD_MS);
  } else {
    payTimeoutId = setTimeout(triggerPandaPayout, remainingTime);
  }
}

function handlePause() {
  isRunning = false;
  let pauseTime = Date.now();
  clearTimeout(payTimeoutId);
  payTimeoutId = 0;
  let timePassed = Math.floor(pauseTime - lastIntervalTime);
  if (remainingTime == 0) {
    remainingTime = PAYOUT_TIME_PERIOD_MS;
  }
  remainingTime = remainingTime - timePassed;
  console.log(
    `[panoptoPage.js] remainingTime before payout ${remainingTime} (${PAYOUT_TIME_PERIOD_MS} - ${timePassed}) `,
  );
}

function triggerPandaPayout() {
  lastIntervalTime = Date.now();
  clearTimeout(payTimeoutId);
  payTimeoutId = 0;
  remainingTime = 0;
  // Trigger a pop up box that the user needs to click to send a post to the backedn
  // This will increment the users pandabucks by X amount every Y minutes
  injectPopup();
}

// Looks for video element on the screen to add event listeneres to which will
// add in logic for listening to play/pause events
function addEventListeners(attempt = 0) {
  if (attempt < 3) {
    const videos = document.getElementsByTagName("video");
    console.log("[panoptoPage.js] video elements found:", videos);
    if (videos.length > 0) {
      const video = videos[0];
      console.log("[panoptoPage.js] found video element:", video);
      video.addEventListener("play", (event) => {
        handlePlay();
      });
      video.addEventListener("pause", (event) => {
        handlePause();
      });

      createChatInputElement();
    } else {
      console.log("[panoptoPage.js] Timeout finished, element not found trying again in 3 seconds");
      setTimeout(() => {
        addEventListeners(attempt + 1);
      }, 3000);
    }
  } else {
    console.log("[panoptoPage.js] Unable to find video element in 3 attempts");
  }
}

// There is sometimes a message displayed at the start of panopto videos
// After this is finished is when the video element is added, as such we need to wait for it to pass
window.setTimeout(() => {
  addEventListeners();
  createPopupElement();
}, 4000);

const id = "popup-watch-reward-chrome-extension";

const handleCollect = () => {
  // If the video is still running reset the timeout
  if (isRunning) {
    payTimeoutId = setTimeout(triggerPandaPayout, PAYOUT_TIME_PERIOD_MS);
  }

  // Need to replace the '5' with PAYOUT_TIME_PERIOD_MIN, when we finalise the time
  postCollection(5);

  // Handles the slide out animation
  const frame = document.getElementById(id);
  frame.style.transform = "translateX(400px)";
};

function createPopupElement() {
  let popup = document.createElement("div");

  popup.className = "popup";
  popup.id = id;

  let leftContainer = document.createElement("div");
  leftContainer.className = "left-container";

  let gem = document.createElement("img");
  gem.src = "https://aat-bucket-hackathon.s3.ap-southeast-2.amazonaws.com/gem_1.svg";
  gem.className = "gem";

  let gemNumber = document.createElement("p");
  gemNumber.innerText = "x 50";
  gemNumber.style.fontSize = "14px";

  let gemContainer = document.createElement("div");
  gemContainer.className = "gem-container";

  gemContainer.appendChild(gem);
  gemContainer.appendChild(gemNumber);

  leftContainer.appendChild(gemContainer);

  let button = document.createElement("button");
  button.innerText = "Collect";
  button.id = `${id}-button`;
  button.className = "collect-button font";

  button.addEventListener("click", handleCollect);

  let text = document.createElement("p");
  text.className = "collect-message font";
  text.id = `${id}-text`;
  text.innerText = "That's another 5 minutes watched!";

  leftContainer.appendChild(button);
  popup.appendChild(leftContainer);
  popup.appendChild(text);

  let body = document.getElementsByTagName("body")[0];
  body.appendChild(popup);
}

const updatePopup = () => {
  let button = document.getElementById(`${id}-button`);
  let text = document.getElementById(`${id}-text`);
  if (isLoggedIn) {
    button.className = "collect-button font";
    button.disabled = true;
    text.innerText = "That's another 5 minutes watched!";
  } else {
    button.className = "collect-button-disabled font";
    button.disabled = true;
    text.innerHTML = "You have a new reward!<br><a style='color: #9a33ca'>Sign in</a> to collect";
  }
};

const handleSendChat = () => {
  const input = document.getElementById("chat-message-input-field");
  const message = input.value;
  if (message.length > 0) {
    // postChat(message);
    input.value = "";
  }
};

function createChatInputElement() {
  const id = "chat-message-input-box";

  const old = document.getElementById(id);
  if (old !== undefined && old !== null) {
    old.remove();
  }

  const costDiv = document.createElement("div");
  const gem = document.createElement("img");
  gem.src = "https://aat-bucket-hackathon.s3.ap-southeast-2.amazonaws.com/gem_1.svg";
  gem.id = "chat-message-input-box-gem";

  const inputField = document.createElement("input");
  inputField.id = "chat-message-input-field";
  inputField.type = "text";

  const inputBtn = document.createElement("input");
  inputBtn.id = "chat-message-input-button";
  inputBtn.type = "button";
  inputBtn.value = "Send";
  inputBtn.addEventListener("click", handleSendChat);

  const div2 = document.createElement("div");
  div2.id = "chat-message-input-field-container";
  div2.appendChild(inputField);

  const div = document.createElement("div");
  div.id = id;
  div.style.position = "absolute";
  div.style.bottom = 0;
  div.style.left = 0;
  div.style.width = "400px";

  div.appendChild(div2);
  div.appendChild(inputBtn);

  const video = document.body.getElementsByClassName("player-layout-controls-container");
  if (video.length === 0) {
    return;
  }

  video[0].appendChild(div);
}

const injectPopup = () => {
  let frame = document.getElementById(id);
  if (frame !== undefined && frame !== null) {
    frame.style.transform = "translateX(0)";
  }
};

const postCollection = (timeInMinutes) => {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  let raw = JSON.stringify({
    minutes: timeInMinutes,
  });

  let requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const userId = localStorage.getItem("userId");

  fetch(`https://aat-backend.herokuapp.com/user/${userId}/addTime`, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("[panoptoPage.js] post error ", error));
};
