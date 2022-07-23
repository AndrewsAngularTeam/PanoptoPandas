import { TimingProvider } from "./context/TimingContext";
import TimerButtons from "./components/TimerButtons";
import "./App.css";

function App() {
  const handlePopup = () => {
    if (chrome.runtime.openOptionsPage) {
      let w = 440;
      let h = 220;
      let left = screen.width / 2 - w / 2;
      let top = screen.height / 2 - h / 2;

      chrome.windows.create(
        { url: "options.html", type: "popup", width: w, height: h, left: left, top: top },
        function (window) {},
      );
    }
  };

  return (
    <TimingProvider>
      <div className="App">
        <button onClick={handlePopup}>POPUP</button>
        <TimerButtons />
      </div>
    </TimingProvider>
  );
}

export default App;
