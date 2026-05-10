import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

export default function Auth({ onLogin }) {
  const [isSignup, setIsSignup] = useState(false);

  return (
    <div className="auth-container">
      <div className="card">
        <img src="/pokeball-transparent.png" alt="pokeball logo" className="logo" />
        <h1>PokeTrivia</h1>

        {!isSignup ? (
          <Login
            onLogin={onLogin}
            onSwitchToSignup={() => setIsSignup(true)}
          />
        ) : (
          <Signup
            onSignupSuccess={() => setIsSignup(false)}
            onSwitchToLogin={() => setIsSignup(false)}
          />
        )}
      </div>
    </div>
  );
}
