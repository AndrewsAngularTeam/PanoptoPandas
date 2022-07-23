const populateComment = (message) => {
  console.log(2.5);
  const ID = "primaryPlayer";
  const element = document.getElementById(ID);
  let commentOverlay = element.querySelector(".comment-overlay");
  if (commentOverlay == null) {
    commentOverlay = document.createElement("div");
    commentOverlay.classList.add("comment-overlay");
    commentOverlay.style.color = "white";
    commentOverlay.style.position = "absolute";
    commentOverlay.style.bottom = "0";
    commentOverlay.style.height= "100%";
    element.appendChild(commentOverlay)
  }
  console.log("Comment Overlay", commentOverlay);
  const newElement = document.createElement("div");
  newElement.innerText = message;
  newElement.style.transition = "transform 30s linear"
  newElement.style.transform = "TranslateX(-100%)";
  newElement.style.top = String(Math.random() * 50) + "%";
  newElement.style.border = "solid";
  newElement.style.position = "absolute";
  commentOverlay.appendChild(newElement);
  setTimeout(() => {
    newElement.style.transform = "TranslateX(100vw)";
  }, 1_000)
  // cleanup
  setTimeout(() => {
    commentOverlay.removeChild(newElement);
  }, 60_000)
}

["uwu", "hello", "world"].map(populateComment);

