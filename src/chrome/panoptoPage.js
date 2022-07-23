console.log("Loading CONTENT SCRIPT panoptoPage");

window.setTimeout(() => {
  console.log("time out over");
  const video = document.getElementById("secondaryVideo");
  console.log(video);
  if (video) {
    console.log("adding event listener");
    video.addEventListener("play", (event) => {
      console.log(event);
      chrome.runtime.sendMessage({ type: "PLAY" }, function (response) {
        console.log("RESPONSE: ", response);
      });
    });
    video.addEventListener("pause", (event) => {
      console.log(event);
      chrome.runtime.sendMessage({ type: "PAUSE" }, function (response) {
        console.log("RESPONSE: ", response);
      });
    });
  }
  console.log("CONTENT SCRIPT panoptoPage run");
}, 7000);
