import { useState } from "react";

export default function GameHeader({ user, onLogout }) {
  const [showProfile, setShowProfile] = useState(false);

  const users =
    JSON.parse(localStorage.getItem("users")) || [];

  const currentUser =
    users.find((u) => u.username === user.username) || user;

  return (
    <header className="game-nav">
      <div className="brand">
        <img
          src="/pokeball-transparent.png"
          alt="Pokeball"
          className="brand-logo"
        />
        <span>PokeTrivia</span>
      </div>

      <div className="nav-actions">
        <button
          className="nav-button"
          onClick={() => setShowProfile((prev) => !prev)}
        >
          {currentUser.username}
        </button>

        <button
          className="nav-button logout-button"
          onClick={onLogout}
        >
          Log Out
        </button>

        {showProfile && (
          <div className="profile-menu">
            <h2>{currentUser.username}</h2>
            <p>Best Score: {currentUser.bestScore}</p>
          </div>
        )}
      </div>
    </header>
  );
}
