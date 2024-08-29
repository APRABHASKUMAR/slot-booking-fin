import React, { useState } from "react";
import GoogleButton from "react-google-button";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import "./oauth.css";
import { app } from "../firebase";
import Heading from "./Heading";
import { useNavigate } from "react-router-dom";

function OAuth() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const auth = getAuth(app);
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      const email = resultsFromGoogle.user.email;

      if (email.endsWith(".bits-pilani.ac.in")) {
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
        console.log("Fetch response data:", data);
        
        if (res.ok) {
          // Store token and user's name in localStorage
          localStorage.setItem("authToken", data.token);
          localStorage.setItem("userName", data.name);  // Store the user's name
          setIsAuthorized(true);
          navigate("/home");
        }
      } else {
        alert("You must use an email ending with '@wilp.bits-pilani.ac.in' to log in.");
        auth.signOut();
      }
    } catch (error) {
      console.error("Error during authentication:", error);
    }
  };

  return (
    <div className="bg">
      {isAuthorized ? (
        <p>Redirecting...</p>
      ) : (
        <div className="google dis-login box">
          <div className="title">
            <Heading greeting="Welcome to " title="RemoteX" />
          </div>
          <GoogleButton type="dark" onClick={handleGoogleClick} />
          <p className="grey mt-3">Use your WILP email ID to login</p>
        </div>
      )}
      <footer className="footer mt-auto bg-dark">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="text-muted text-center mt-3 mb-3">
                <small className="grey">Designed and developed by Divyansh and Vivek</small>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default OAuth;
