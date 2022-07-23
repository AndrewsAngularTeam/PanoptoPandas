import "./App.scss";
import classes from "./App.module.scss"
import NavBar from "./components/NavBar/NavBar";
import Marketplace from "./pages/Marketplace/Marketplace";
import Leaderboard from "./pages/Leaderboard/Leaderboard";
import { useState } from "react";

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

  const [currentRoute, setCurrentRoute] = useState("Customisations")

  const pageRoutes = [
    {
      name: "Customisations",
      component: <Marketplace />,
    },
    {
      name: "Leaderboard",
      component: <Leaderboard />,
    }
  ]

  const displayPage = () => {
    for (let page of pageRoutes) {
      if (page.name.trim() === currentRoute.trim()) {
        return page.component
      }
    }
  }

  return (
    <div className="App">
      <NavBar
        pages={pageRoutes}
        onRouteClicked={setCurrentRoute}
        currentRoute={currentRoute}
      />
      <div className={classes.AppBody}>
        {displayPage()}
      </div>
    </div>
  );
}

export default App;
