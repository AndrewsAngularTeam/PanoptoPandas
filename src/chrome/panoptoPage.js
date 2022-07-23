console.log("[panoptoPage.js] Loading content script");

// the payout time period in seconds
const PAYOUT_TIME_PERIOD = 10000;

let payTimeoutId = -1;
let lastIntervalTime = 0;
let remainingTime = 10000;

function handlePlay() {
  console.log("[panoptoPage.js] timeout for pay has started");
  if (payTimeoutId !== 0) {
    payTimeoutId = setTimeout(triggerPandaPayout, PAYOUT_TIME_PERIOD);
  } else {
    payTimeoutId = setTimeout(triggerPandaPayout, remainingTime);
  }
}

function handlePause() {
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
  payTimeoutId = setTimeout(triggerPandaPayout, PAYOUT_TIME_PERIOD);
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
