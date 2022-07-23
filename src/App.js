import logo from "./logo.svg";
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
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
            Learn React
          </a>
        </header>
        <button onClick={handlePopup}>POPUP</button>
        <TimerButtons />
      </div>
    </TimingProvider>
  );
}

export default App;
