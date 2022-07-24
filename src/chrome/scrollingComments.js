
setTimeout(() =>
  fetch("https://aat-backend.herokuapp.com/chat")
    .then(r => r.json())
    .then(comments => {
      console.log(comments);
      setInterval(() => {
        const videoElement = document.getElementById("primaryVideo");
        if (!videoElement.paused && comments[String(Math.floor(videoElement.currentTime))]) {
          comments[String(Math.floor(videoElement.currentTime))].map(populateComment);
        }
      }, 1_000)
    }),
4_000);

const populateComment = (message) => {
  console.log(2.5);
  const ID = "primaryPlayer";
  const element = document.getElementById(ID);
  let commentOverlay = element.querySelector(".comment-overlay");
  if (commentOverlay == null) {
    commentOverlay = document.createElement("div");
    commentOverlay.classList.add("comment-overlay");
    commentOverlay.style.position = "absolute";
    commentOverlay.style.bottom = "0";
    commentOverlay.style.height = "100%";
    element.appendChild(commentOverlay)
  }
  console.log("Comment Overlay", commentOverlay);
  const newElement = document.createElement("div");
  newElement.innerText = message;
  newElement.style.transition = "transform 30s linear"
  newElement.style.transform = "TranslateX(100vh)";
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
  }, 1_000)
  // cleanup
  setTimeout(() => {
    commentOverlay.removeChild(newElement);
  }, 60_000)
}

["uwu", "hello", "world"].map(populateComment);

