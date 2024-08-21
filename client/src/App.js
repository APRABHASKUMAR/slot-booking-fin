import React from "react"


import  Login from "./pages/Login"
import Report from "./pages/Report";
import Home from "./pages/Home";
import Admin from "./pages/admin";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
function App() {

  return (
    <Router>
      <Routes>
      <Route path="/home" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/report" element={<Report />}></Route>
        <Route path="/admin" element={<Admin />}></Route>

      </Routes>
    </Router>
  );
}

export default App;