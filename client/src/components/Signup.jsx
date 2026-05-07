import { useState } from "react";

export default function Signup({ goToLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  function handleSignup() {
    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    setMessage("");
    setMessageType("");

    const alreadyExists = users.find(
      (u) => u.username === username
    );

    if (alreadyExists) {
      setMessage("Username already exists.");
      setMessageType("error");
      return;
    }

    const newUser = {
      username,
      password,
      bestScore: 0
    };

    users.push(newUser);

    localStorage.setItem(
      "users",
      JSON.stringify(users)
    );

    setMessage("Account created! You can log in now.");
    setMessageType("success");
    setUsername("");
    setPassword("");
    goToLogin();
  }

  return (
    <div className="auth-page">

      <div className="auth-card">

        <h1>Create Account</h1>

        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleSignup}>
          Sign Up
        </button>

        {message && (
          <p className={`form-message ${messageType}`}>
            {message}
          </p>
        )}

        <p
          className="switch-link"
          onClick={goToLogin}
        >
          Back to Login
        </p>

      </div>
    </div>
  );
}
