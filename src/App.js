import "./App.scss";
import classes from "./App.module.scss";
import NavBar from "./components/NavBar/NavBar";
import Marketplace from "./pages/Marketplace/Marketplace";
import Leaderboard from "./pages/Leaderboard/Leaderboard";
import Settings from "./pages/Settings/Settings";
import { useEffect, useState } from "react";
import { getCurrentTabUId } from "./chrome/utils";
import { signInWithGoogle, auth } from "./utils/firebase";
import { createUser, getCurrentUser, getUser } from "./utils/requests";
import Loading from "./components/Loading/Loading";

function App() {
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState();

  const [user, setUser] = useState();

  const [currentRoute, setCurrentRoute] = useState("Customisations");
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

  useEffect(() => {
    const message = {
      type: "getUserId",
    };

    getCurrentTabUId((id) => {
      id &&
        chrome.tabs.sendMessage(id, message, (response) => {
          if (response == null) {
            alert("The userId does not exist in local storage. Please login first.");
            setLoading(false);
            setIsSignInModalOpen(true);
          } else if (response === "") {
            alert("The userId in local storage is an empty string :( Please fix.");
            setLoading(false);
            setIsSignInModalOpen(true);
          } else {
            setUserId(response);
            setLoading(false);
          }
        });
    });

    console.log("[app.js] useEffect");
    auth.onAuthStateChanged((user) => {
      if (user && user.uid) {
        getUser(user.uid)
          .catch((err) => {
            console.log("[app.js] user", user);
            const create = async () => {
              const newUser = await createUser(user?.displayName ?? "Unnamed User", user.uid);
              setUser(newUser);

              const message = {
                type: "setUserId",
                value: newUser.id,
              };
              getCurrentTabUId((id) => {
                id &&
                  chrome.tabs.sendMessage(id, message, (response) => {
                    console.log("[app.js] user", response);
                    setLoading(false);
                  });
              });
            };
            create();
          })
          .then(() => {
            const message = {
              type: "setUserId",
              value: user.uid,
            };
            getCurrentTabUId((id) => {
              id &&
                chrome.tabs.sendMessage(id, message, (response) => {
                  console.log("[app.js] user", response);
                  setLoading(false);
                });
            });
          });
      }
      setIsSignInModalOpen(false);
    });
  }, []);

  useEffect(() => {
    if (!userId) {
      return;
    }
    const getData = async () => {
      const data = await getCurrentUser();
      setUser(data);
    };
    getData();
  }, [userId]);

  const handleSignIn = () => {
    signInWithGoogle();
  };

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

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="App">
      <NavBar user={user} pages={pageRoutes} onRouteClicked={setCurrentRoute} currentRoute={currentRoute} />
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
