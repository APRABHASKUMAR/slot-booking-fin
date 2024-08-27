import React, { useState } from "react";
import GoogleButton from "react-google-button";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import "./oauth.css";
import { app } from "../firebase";
import Heading from "./Heading";
import { useNavigate } from "react-router-dom";

function OAuth() {
  const [isAuthorized, setIsAuthorized] = useState(false); // State to track authorization
  const auth = getAuth(app);
  const navigate = useNavigate(); // Hook for navigation

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      const email = resultsFromGoogle.user.email;

      if (email.endsWith(".bits-pilani.ac.in")) { // Ensure the correct domain
        alert("User is authorized.");

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
        console.log("Fetch response data:", data); // Debugging: Check fetch response
        
        if (res.ok) {
          // Store token in localStorage
          localStorage.setItem("authToken", data.token);
          setIsAuthorized(true);
          navigate("/home"); // Redirect to Home page
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
    <div>
      {isAuthorized ? (
        <p>Redirecting...</p> // Temporary message until redirect happens
      ) : (
        <div className="google dis-login box">
          <Heading title="Welcome to RemoteX" />
          <p>Use your WILP email ID to login</p>
          <GoogleButton type="dark" onClick={handleGoogleClick} />
        </div>
      )}
      <footer className="footer mt-auto bg-light">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="text-muted text-center mt-3 mb-3">
                <small className="light">Designed and developed by Divyansh and Vivek</small>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default OAuth;
