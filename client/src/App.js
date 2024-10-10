import React,{useState,useEffect} from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/Home";
import Report from "./pages/Report";
import Admin from "./pages/admin";
import Header from "./components/Header";
import "./stylizer/App.css"

// Mock function to check if the user is authenticated
const isAuthenticated = () => {
  return !!localStorage.getItem("authToken"); // Assuming token is stored in localStorage
};

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        
        {/* Protected route for Home */}
        <Route 
          path="/home" 
          element={isAuthenticated() ? <Home /> : <Navigate to="/" />} 
        />
        
        {/* Protected route for Report */}
        <Route 
          path="/report" 
          element={isAuthenticated() ? <Report /> : <Navigate to="/" />} 
        />
        
        {/* Assuming Admin route also needs protection */}
        <Route 
          path="/admin" 
          element={isAuthenticated() ? <Admin /> : <Navigate to="/" />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
