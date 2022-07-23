console.log("Loading CONTENT SCRIPT panoptoPage");

// the payout time period in seconds
const PAYOUT_TIME_PERIOD = 10000;

let payTimeoutId = -1;
let lastIntervalTime = 0;
let remainingTime = 10000;

function handlePlay() {
  console.log("Handle play called");
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
  console.log("timePassed: ", timePassed);
  remainingTime = PAYOUT_TIME_PERIOD - timePassed;
  console.log("remainingTime: ", remainingTime);
  payTimeoutId = 0;
}

function triggerPandaPayout() {
  lastIntervalTime = Date.now();
  console.log("CONGRATS HERE IS 10 PANDA BUCKS");
  // Trigger a pop up box that the user needs to click to send a post to the backedn
  // This will increment the users pandabucks by 50, every 5 minutes
  payTimeoutId = setTimeout(triggerPandaPayout, PAYOUT_TIME_PERIOD);
}

window.setTimeout(() => {
  console.log("time out over");
  const video = document.getElementById("secondaryVideo");
  console.log(video);
  if (video) {
    console.log("adding event listener");
    video.addEventListener("play", (event) => {
      handlePlay();
    });
    video.addEventListener("pause", (event) => {
      handlePause();
    });
  }
  console.log("CONTENT SCRIPT panoptoPage run");
}, 7000);
