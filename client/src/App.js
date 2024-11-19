import React,{useState,useEffect} from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/home";
import Report from "./pages/Report";
import Admin from "./pages/admin";
import Header from "./components/Header";
import { AuthProvider, useAuth } from './context/AuthContext';
import "./stylizer/App.css"

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    // If user is still loading, show a loading indicator (can be any spinner or message)
    return <div>Loading...</div>;
  }

  if (!user) {
    console.log('User is not authenticated, redirecting to login');
    return <Navigate to="/" />;
  }

  return children;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/report"
            element={
              <ProtectedRoute>
                <Report />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
