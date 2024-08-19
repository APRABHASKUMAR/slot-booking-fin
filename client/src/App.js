import React from "react"


import  Login from "./pages/login"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
function App() {

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </Router>
  );
}

export default App;