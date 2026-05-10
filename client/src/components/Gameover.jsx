import GameHeader from "./GameHeader";

export default function GameOver({
  user,
  score,
  restart,
  onLogout
}) {
  const users =
    JSON.parse(localStorage.getItem("users")) || [];

  const currentUser = users.find(
    (u) => u.username === user.username
  );

  return (
    <div className="game-page">
      <GameHeader user={user} onLogout={onLogout} />

      <div className="game-card">

        <h1>Game Over</h1>

        <h2>{user.username}</h2>

        <p>Final Score: {score}</p>

        <p>
          Best Score: {currentUser.bestScore}
        </p>

        <button onClick={restart}>
          Play Again
        </button>

      </div>
    </div>
  );
}
