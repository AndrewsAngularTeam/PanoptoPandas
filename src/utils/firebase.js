import { initializeApp } from "firebase/app";

import { GoogleAuthProvider, getAuth, signInWithCredential, signOut } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdWGc_RmyA6Ckld9JB6BOhXO6Ba5pUrnE",
  authDomain: "andrewsangularteam.firebaseapp.com",
  projectId: "andrewsangularteam",
  storageBucket: "andrewsangularteam.appspot.com",
  messagingSenderId: "1068583549557",
  appId: "1:1068583549557:web:3b9e775ea1f0323b3a163c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const signInWithGoogle = async () => {
  console.log("[firebase.js] signInWithGoogle");
  chrome.identity.getAuthToken({ interactive: true, scopes: ["email"] }, (token) => {
    if (chrome.runtime.lastError || !token) {
      alert(`SSO ended with an error: ${JSON.stringify(chrome.runtime.lastError)}`);
      return;
    }
    signInWithCredential(auth, GoogleAuthProvider.credential(null, token))
      .then((res) => {
        console.log("signed in!");
      })
      .catch((err) => {
        alert(`SSO ended with an error: ${err}`);
      });
  });
};

const signOutWithGoogle = async () => {
  try {
    await signOut(auth);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

export { auth, signInWithGoogle, signOutWithGoogle };

export default app;
