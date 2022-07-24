let videoElement = null;

setTimeout(
  () =>
    fetch("https://aat-backend.herokuapp.com/chat")
      .then((r) => r.json())
      .then((comments) => {
        console.log(`[scrollingComment.js] API response`, comments);
        setInterval(() => {
          if (videoElement !== null) {
            if (comments[String(Math.floor(videoElement.currentTime))]) {
              comments[String(Math.floor(videoElement.currentTime))].map(populateComment);
            }
          }
        }, 1_000);
      }),
  4_000,
);

const populateComment = (message) => {
  const ID = "primaryPlayer";
  const element = document.getElementById(ID);
  let commentOverlay = element.querySelector(".comment-overlay");
  if (commentOverlay == null) {
    commentOverlay = document.createElement("div");
    commentOverlay.classList.add("comment-overlay");
    commentOverlay.style.position = "absolute";
    commentOverlay.style.bottom = "0";
    commentOverlay.style.height = "100%";
    element.appendChild(commentOverlay);
  }
  console.log("[scrollingComment.js] Comment Overlay", commentOverlay);
  const newElement = document.createElement("div");
  newElement.innerText = message;
  newElement.style.transition = "transform 30s linear";
  newElement.style.transform = "TranslateX(100vw)";
  newElement.style.top = String(Math.random() * 50) + "%";
  newElement.style.position = "absolute";
  newElement.style["-webkit-text-stroke-color"] = "black";
  newElement.style["-webkit-text-stroke-width"] = "1px";
  newElement.style.color = "white";
  newElement.style.fontSize = "30px";
  newElement.style.fontWeight = "500";
  newElement.style.width = "100vw";
  commentOverlay.appendChild(newElement);
  setTimeout(() => {
    newElement.style.transform = "TranslateX(-100%)";
  }, 1_000);
  // cleanup
  setTimeout(() => {
    commentOverlay.removeChild(newElement);
  }, 60_000);
};

["uwu", "hello", "world"].map(populateComment);

// From panoptoPage.js
const videoElementId = "primaryVideo";

function addEventListeners(attempt = 0) {
  if (attempt < 3) {
    console.log(`[panoptoPage.js] attempt ${attempt + 1}`);
    const videos = document.getElementById(videoElementId);
    console.log("[panoptoPage.js] video elements found:", videos);

    if (videos != null) {
      // Found it
      videoElement = videos;
    } else {
      setTimeout(() => {
        addEventListeners(attempt + 1);
      }, 3000);
    }
  } else {
    console.log("[panoptoPage.js] Unable to find video element in 3 attempts");
  }
}

window.setTimeout(() => {
  addEventListeners();
}, 4000);
