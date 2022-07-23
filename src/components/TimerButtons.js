import { useEffect } from "react";
import { useTimer } from "../context/TimingContext";

export default function TimerButtons() {
  const { start, pause, reset, elapsedTime } = useTimer();

  useEffect(() => {
    setupListener();
  }, []);

  function loadEventHandlers() {
    const message = {
      from: "TimerButtons",
      message: "LoadEventHandlers",
    };

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      console.log(tabs[0].url);
      chrome.tabs.sendMessage(tabs[0].id, message, (response) => {
        console.log(response);
      });
    });
  }

  function setupListener() {
    console.log("Setting up listener");
    window.addEventListener("VideoCustomEvent", function (e) {
      var data = e.detail;
      console.log("event", e);
      console.log("received", data);
      if (data === "PLAY") {
        start();
      } else if (data === "PAUSE") {
        pause();
      } else {
        console.log("NOT RECOGNISED");
      }
    });
    console.log(document);
  }
  return (
    <div>
      <button onClick={start}>Start Timer</button>
      <button onClick={pause}>Pause Timer</button>
      <button onClick={reset}>Reset Timer</button>
      <button onClick={() => console.log(elapsedTime)}>Get current Time</button>
      <button onClick={loadEventHandlers}>event handlers</button>
    </div>
  );
}
