import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import MainPage from "./components/MainPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/auth/login" element={<LoginPage />} />
        <Route
          path="/home"
          element={
            localStorage.getItem("authToken") ? <MainPage /> : <Navigate to="/auth/login" />
          }
        />
        <Route path="*" element={<Navigate to="/auth/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
