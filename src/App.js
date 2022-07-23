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
    });
  }, []);

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

  const handleSignIn = () => {
    signInWithGoogle();
  };

  return (
    <div className="App">
      <header className="App-header">
        {user !== null && user !== undefined && (
          <>
            <p>Signed in as {user.displayName}.</p>
            <button onClick={auth.signOut.bind(auth)}>Sign Out?</button>
          </>
        )}
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={handlePopup}>POPUP</button>
        <button onClick={handleSignIn}>SignInWithGoogle</button>
      </header>
    </div>
  );
}

export default App;
