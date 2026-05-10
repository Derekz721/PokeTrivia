import { useState } from "react";

import Login from "./components/Login";
import Signup from "./components/Signup";
import Game from "./components/Game";
import GameOver from "./components/Gameover";

export default function App() {
  const [screen, setScreen] = useState("login");
  const [user, setUser] = useState(null);
  const [finalScore, setFinalScore] = useState(0);

  function handleLogout() {
    localStorage.removeItem("currentUser");
    setUser(null);
    setFinalScore(0);
    setScreen("login");
  }

  return (
    <>
      {screen === "login" && (
        <Login
          onLogin={(loggedInUser) => {
            setUser(loggedInUser);
            setScreen("game");
          }}
          goToSignup={() => setScreen("signup")}
        />
      )}

      {screen === "signup" && (
        <Signup
          goToLogin={() => setScreen("login")}
        />
      )}

      {screen === "game" && (
        <Game
          user={user}
          onLogout={handleLogout}
          onGameOver={(score) => {
            setFinalScore(score);
            setScreen("gameover");
          }}
        />
      )}

      {screen === "gameover" && (
        <GameOver
          user={user}
          score={finalScore}
          restart={() => setScreen("game")}
          onLogout={handleLogout}
        />
      )}
    </>
  );
}
