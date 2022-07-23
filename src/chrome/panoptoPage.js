console.log("[panoptoPage.js] Loading content script");

// the payout time period in seconds
const PAYOUT_TIME_PERIOD = 10000;

let payTimeoutId = -1;
let lastIntervalTime = 0;
let remainingTime = 10000;
let isRunning = false;

function handlePlay() {
  isRunning = true;
  console.log("[panoptoPage.js] timeout for pay has started");
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
  console.log("[panoptoPage.js] Trigger pandabucks payout");
  // Trigger a pop up box that the user needs to click to send a post to the backedn
  // This will increment the users pandabucks by 50, every 5 minutes
  injectPopup();
}

window.setTimeout(() => {
  addEventListeners();
}, 4000);

function addEventListeners(attempt = 0) {
  if (attempt < 3) {
    console.log("[panoptoPage.js] Timeout finished, check for video element");
    const video = document.getElementById("secondaryVideo");
    console.log(video);
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
  console.log("[panoptoPage.js] Collection of pandabucks");
  // If the video is still running reset the timeout
  if (isRunning) {
    payTimeoutId = setTimeout(triggerPandaPayout, PAYOUT_TIME_PERIOD);
  }

  postCollection(5);
  const frame = document.getElementById(id);
  frame.className = "hidden";
};

const injectPopup = () => {
  const frame = document.getElementById(id);
  if (frame !== undefined && frame !== null) {
    console.log("[panoptoPage.js] show popup");
    frame.className = "popup";
  } else {
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
    button.className = "poppins collect-button";
    button.addEventListener("click", handleCollect);

    let text = document.createElement("p");
    text.className = "poppins collect-message";
    text.innerText = "That's another 5 minutes watched!";

    leftContainer.appendChild(button);
    popup.appendChild(leftContainer);
    popup.appendChild(text);

    let body = document.getElementsByTagName("body")[0];
    body.appendChild(popup);
  }

  console.log("[panoptoPage.js] Created popup");
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
