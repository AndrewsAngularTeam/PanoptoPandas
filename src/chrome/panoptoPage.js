console.log("[panoptoPage.js] Loading content script");

// the payout time period in seconds
const PAYOUT_TIME_PERIOD = 5000;

let payTimeoutId = -1;
let lastIntervalTime = 0;
let remainingTime = 10000;
let isRunning = false;

let isLoggedIn = false;

function handlePlay() {
  isRunning = true;
  if (payTimeoutId !== 0) {
    payTimeoutId = setTimeout(triggerPandaPayout, PAYOUT_TIME_PERIOD);
  } else {
    payTimeoutId = setTimeout(triggerPandaPayout, remainingTime);
  }
}

function handlePause() {
  isRunning = false;
  let pauseTime = Date.now();
  clearTimeout(payTimeoutId);
  let timePassed = Math.floor(pauseTime - lastIntervalTime);
  remainingTime = PAYOUT_TIME_PERIOD - timePassed;
  console.log("[panoptoPage.js] remainingTime before next payout: ", remainingTime);
  payTimeoutId = 0;
}

function triggerPandaPayout() {
  lastIntervalTime = Date.now();
  // Trigger a pop up box that the user needs to click to send a post to the backedn
  // This will increment the users pandabucks by X amount every Y minutes
  injectPopup();
}

window.setTimeout(() => {
  addEventListeners();
}, 4000);

function addEventListeners(attempt = 0) {
  if (attempt < 3) {
    const video = document.getElementById("secondaryVideo");
    if (video) {
      video.addEventListener("play", (event) => {
        handlePlay();
      });
      video.addEventListener("pause", (event) => {
        handlePause();
      });
    } else {
      console.log("[panoptoPage.js] Timeout finished, element not found trying again in 3 seconds");
      addEventListeners(attempt + 1);
    }
  } else {
    console.log("[panoptoPage.js] Unable to find video element in 3 attempts");
  }
}

const id = "popup-watch-reward-chrome-extension";

const handleCollect = () => {
  // If the video is still running reset the timeout
  if (isRunning) {
    payTimeoutId = setTimeout(triggerPandaPayout, PAYOUT_TIME_PERIOD);
  }

  postCollection(5);
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
  gemNumber.innerText = "x 500";
  gemNumber.style.fontSize = "14px";

  let gemContainer = document.createElement("div");
  gemContainer.className = "gem-container";
  gemContainer.appendChild(gem);
  gemContainer.appendChild(gemNumber);

  leftContainer.appendChild(gemContainer);

  let button = document.createElement("button");
  button.innerText = "Collect";
  if (isLoggedIn) {
    button.className = "collect-button font";
  } else {
    button.className = "collect-button-disabled font";
    button.disabled = true;
  }

  button.addEventListener("click", handleCollect);

  let text = document.createElement("p");
  text.className = "collect-message font";
  if (isLoggedIn) {
    text.innerText = "That's another 5 minutes watched!";
  } else {
    text.innerHTML = "You have a new reward!<br><a style='color: #9a33ca'>Sign in</a> to collect";
  }

  leftContainer.appendChild(button);
  popup.appendChild(leftContainer);
  popup.appendChild(text);

  let body = document.getElementsByTagName("body")[0];
  body.appendChild(popup);
}

createPopupElement();

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

  let userId = "bob123";

  fetch(`https://aat-backend.herokuapp.com/user/${userId}/addTime`, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("[panoptoPage.js] post error ", error));
};
