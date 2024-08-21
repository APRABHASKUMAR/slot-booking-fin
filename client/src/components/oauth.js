import React from "react";
import GoogleButton from "react-google-button";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import "./oauth.css";
import { app } from "../firebase";
import Heading from "./Heading";

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
    <div>
      <div className="google dis-login box">
      <Heading 
        title = "Welcome to RemoteX"
      />
      <p>Use your WILP email id to login</p>
      <GoogleButton type="dark" onClick={handleGooogleClick} />
    </div>
    <footer class="footer mt-auto bg-light">
    <div class="container">
        <div class="row">
            <div class="col">
                <p class="text-muted text-center mt-3 mb-3">
                    <small className="light">Designed and developed by Divyansh and Vivek</small>
                </p>
            </div>
        </div>
    </div>
</footer>
    </div>
  );
};

export default OAuth;
