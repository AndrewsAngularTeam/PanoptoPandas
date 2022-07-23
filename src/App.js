import "./App.scss";
import { getCurrentTabUId } from "./chrome/utils";
import "./options/";

function App() {
  const handlePopup = () => {
    const message = {
      type: "inject",
    };

    getCurrentTabUId((id) => {
      id &&
        chrome.tabs.sendMessage(id, message, (responseFromContentScript) => {
          console.log(responseFromContentScript);
        });
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
        <button onClick={handlePopup}>POPUP</button>
      </header>
    </div>
  );
}

export default App;
