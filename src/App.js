import "./App.scss";
import classes from "./App.module.scss";
import NavBar from "./components/NavBar/NavBar";
import Marketplace from "./pages/Marketplace/Marketplace";
import Leaderboard from "./pages/Leaderboard/Leaderboard";
import Settings from "./pages/Settings/Settings";
import { useEffect, useState } from "react";
import { getCurrentTabUId } from "./chrome/utils";
import { signInWithGoogle, auth } from "./utils/firebase";

function App() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    console.log("[app.js] useEffect");
    auth.onAuthStateChanged((user) => {
      console.log("[app.js]", user);
      setUser(user && user.uid ? user : null);
      setIsSignInModalOpen(false);
    });
  }, []);

  const handleSignIn = () => {
    setIsSignInModalOpen(false);
    signInWithGoogle();
  };

  const [currentRoute, setCurrentRoute] = useState("Customisations");
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

  const pageRoutes = [
    {
      name: "Customisations",
      component: <Marketplace />,
    },
    {
      name: "Leaderboard",
      component: <Leaderboard />,
    },
    {
      name: "Settings",
      component: <Settings />,
    },
  ];

  const displayPage = () => {
    for (let page of pageRoutes) {
      if (page.name.trim() === currentRoute.trim()) {
        return page.component;
      }
    }
  };

  return (
    <div className="App">
      <NavBar pages={pageRoutes} onRouteClicked={setCurrentRoute} currentRoute={currentRoute} />
      <div className={classes.AppBody}>{displayPage()}</div>
      {isSignInModalOpen && (
        <div className={classes.Modal}>
          <button onClick={handleSignIn}>Sign in</button>
          <p>to start accumulating rewards</p>
        </div>
      )}
    </div>
  );
}

export default App;
