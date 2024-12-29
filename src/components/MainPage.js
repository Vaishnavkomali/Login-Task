import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import profilePhoto from "../asset/profile-photo.png"; // Import local image

const MainPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/auth/login"); // Redirect to login if not authenticated
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    navigate("/auth/login");
  };

  const user = JSON.parse(localStorage.getItem("user")) || {
    username: "Michael Dam",
    email: "example@gmail.com",
    gender: "Female",
  };

  return (
    <div className="main-page">
      <h1 className="main-title">
        Welcome to <h2 className="brand">Unstop</h2>
      </h1>
      <div className="card">
        {/* Using Local Image */}
        <img
          src={profilePhoto}
          alt="Profile"
          className="profile-pic"
        />
        <h2 className="user-name">{user.username}</h2>
        <p className="user-email">{user.email}</p>
        <p className="user-gender">Female</p>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </div>
  );
};

export default MainPage;
