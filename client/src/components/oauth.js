import React from "react";
import GoogleButton from "react-google-button";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import "./oauth.css";
import { app } from "../firebase";

const OAuth = () => {
  const auth = getAuth(app);
  const handleGooogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      const res = await fetch("http://localhost:5000/api/auth/google", {
        method: "POST",
        headers: {
         'Access-Control-Allow-Origin': '*',
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name: resultsFromGoogle.user.displayName,
          email: resultsFromGoogle.user.email,
          googlePhotoUrl: resultsFromGoogle.user.photoURL,
        }),
      });
      const data = await res.json();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="google">
      <GoogleButton type="light" onClick={handleGooogleClick} />
    </div>
  );
};

export default OAuth;
