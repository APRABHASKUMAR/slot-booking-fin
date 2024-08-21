import React from "react";
import Home from "./pages/home";
import  Login from "./pages/login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css"

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/home" element={<Home />}></Route>
      </Routes>
    </Router>
  );
}

export default App;