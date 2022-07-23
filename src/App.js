import "./App.scss";
import classes from "./App.module.scss"
import NavBar from "./components/NavBar/NavBar";
import Marketplace from "./pages/Marketplace/Marketplace";

function App() {
  const handlePopup = () => {
    if (chrome.runtime.openOptionsPage) {
      let w = 440;
      let h = 220;
      let left = screen.width / 2 - w / 2;
      let top = screen.height / 2 - h / 2;

      chrome.windows.create(
        { url: "options.html", type: "popup", width: w, height: h, left: left, top: top },
        function (window) { },
      );
    }
  };

  return (
    <div className="App">
      <NavBar />
      <div className={classes.AppBody}>
        <Marketplace />
      </div>
    </div>
  );
}

export default App;
