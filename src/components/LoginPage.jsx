import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import googleLogo from "../asset/google.png";
import facebookLogo from "../asset/facebook.png";
import userIcon from "../asset/user-icon.png";
import emailIcon from "../asset/email-icon.png";
import passwordIcon from "../asset/password-icon.png";
import sideImage from "../asset/side-image.png";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false); // Remember Me state
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const baseUrl = "http://localhost:5000"; // Backend API URL

  const validateAndSubmit = async () => {
    setError("");

    if (username !== "emilys") {
      setError("Invalid username. Only 'emilys' is allowed.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Invalid email format.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    try {
      const response = await fetch(`${baseUrl}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, rememberMe }),
      });

      if (!response.ok) {
        throw new Error("Invalid login credentials.");
      }

      const data = await response.json();
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="wrapper">
      <div className="image">
        <img src={sideImage} alt="Side Graphic" />
      </div>
      <div className="container">
        <div className="header">
          <h1>
            Welcome to <span>Unstop</span>
          </h1>
        </div>
        <button className="google-btn">
          <img src={googleLogo} alt="Google" />
          Login with Google
        </button>
        <button className="facebook-btn">
          <img src={facebookLogo} alt="Facebook" />
          Login with Facebook
        </button>
        <p className="divider">OR</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            validateAndSubmit();
          }}
        >
          <div className="input-group">
            <input
              type="text"
              placeholder="User name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <img src={userIcon} alt="User Icon" className="input-icon" />
          </div>
          <div className="input-group">
            <input
              type="email"
              placeholder="useremail@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <img src={emailIcon} alt="Email Icon" className="input-icon" />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <img src={passwordIcon} alt="Password Icon" className="input-icon" />
          </div>

          {/* Remember Me */}
          <div className="checkbox-container">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="rememberMe">Remember Me</label>
          </div>

          {/* Forgot Password */}
          <div className="link">
            <a href="/forgot-password">Forgot Password?</a>
          </div>

          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="submit-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
