import { useEffect, useState } from "react";
import { fetchPokemon } from "../Data/Pokemon";
import GameHeader from "./GameHeader";

const TOTAL = 10;

export default function Game({ user, onGameOver, onLogout }) {
  const [pokemon, setPokemon] = useState([]);
  const [current, setCurrent] = useState(null);

  const [choices, setChoices] = useState([]);

  const [score, setScore] = useState(0);
  const [question, setQuestion] = useState(1);

  const [revealed, setRevealed] = useState(false);
  const [result, setResult] = useState("");

  useEffect(() => {
    async function loadGame() {
      const data = await fetchPokemon();

      setPokemon(data);

      generateQuestion(data);
    }

    loadGame();
  }, []);

  function generateQuestion(list) {
    const randomPokemon =
      list[Math.floor(Math.random() * list.length)];

    setCurrent(randomPokemon);

    const options = [randomPokemon.name];

    while (options.length < 4) {
      const randomName =
        list[Math.floor(Math.random() * list.length)].name;

      if (!options.includes(randomName)) {
        options.push(randomName);
      }
    }

    setChoices(shuffle(options));

    setRevealed(false);
    setResult("");
  }

  function revealPokemon() {
    setRevealed(true);
  }

  function handleAnswer(choice) {
    if (result) return;

    setRevealed(true);

    if (choice === current.name) {
      setScore((prev) => prev + 100);
      setResult("Correct!");
    } else {
      setResult(`Wrong! It was ${current.name}`);
    }
  }

  function nextQuestion() {
    if (question >= TOTAL) {
      saveBestScore(score);
      onGameOver(score);
      return;
    }

    setQuestion((prev) => prev + 1);

    generateQuestion(pokemon);
  }

  function saveBestScore(finalScore) {
    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    const updatedUsers = users.map((u) => {
      if (
        u.username === user.username &&
        finalScore > u.bestScore
      ) {
        return {
          ...u,
          bestScore: finalScore
        };
      }

      return u;
    });

    localStorage.setItem(
      "users",
      JSON.stringify(updatedUsers)
    );
  }

  if (!current) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="game-page">
      <GameHeader user={user} onLogout={onLogout} />

      <div className="game-card">

        <div className="top-bar">

          <div>
            Question {question} / {TOTAL}
          </div>

          <div>
            Score: {score}
          </div>

        </div>

        <h1>Who's that Pokémon?</h1>

        <div className="pokemon-box">

          <img
            src={current.image}
            alt="pokemon"
            className={
              revealed
                ? "pokemon-image revealed"
                : "pokemon-image hidden"
            }
          />

        </div>

        {!revealed && (
          <button onClick={revealPokemon}>
            Reveal Pokémon
          </button>
        )}

        <div className="answers-grid">

          {choices.map((choice) => (
            <button
              key={choice}
              onClick={() => handleAnswer(choice)}
            >
              {choice}
            </button>
          ))}

        </div>

        <h2>{result}</h2>

        {result && (
          <button onClick={nextQuestion}>
            Next Question
          </button>
        )}

      </div>
    </div>
  );
}

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}
