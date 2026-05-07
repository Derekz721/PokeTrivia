import { useState } from "react";

export default function Login({ onLogin, goToSignup }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function handleLogin() {
    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    setMessage("");

    const foundUser = users.find(
      (u) =>
        u.username === username &&
        u.password === password
    );

    if (!foundUser) {
      setMessage("Invalid username or password.");
      return;
    }

    localStorage.setItem(
      "currentUser",
      JSON.stringify(foundUser)
    );

    onLogin(foundUser);
  }

  return (
    <div className="auth-page">

      <div className="auth-card">

        <h1>PokeTrivia</h1>
        <p>Welcome back, Trainer!</p>

        <input
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>
          Login
        </button>

        {message && (
          <p className="form-message error">
            {message}
          </p>
        )}

        <p
          className="switch-link"
          onClick={goToSignup}
        >
          Create Account
        </p>

      </div>
    </div>
  );
}
