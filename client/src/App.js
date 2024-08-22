import React from "react";
import Home from "./pages/Home";
import  Login from "./pages/login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css"
import Report from "./pages/Report";
import Admin from "./pages/admin";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/report" element={<Report />}></Route>
        <Route path="/admin" element={<Admin />}></Route>

      </Routes>
    </Router>
  );
}

export default App;