import { useTimer } from "../context/TimingContext";

export default function TimerButtons() {
  const { start, pause, reset, elapsedTime } = useTimer();

  function loadEventHandlers() {
    const message = {
      from: "TimerButtons",
      message: "LoadEventHandlers",
      play: start,
      pause: pause,
    };

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      console.log(tabs[0].url);
      chrome.tabs.sendMessage(tabs[0].id, message, (response) => {
        console.log(response);
      });
    });
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
