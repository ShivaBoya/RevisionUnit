// src/App.tsx
import React from "react";
import { useTheme } from "./hooks/Usetheme";

const App: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`app ${theme}`}>
      <h1>React Theme Switcher</h1>
      <p>Current theme: <strong>{theme}</strong></p>
      <button onClick={toggleTheme}>
        Switch to {theme === "light" ? "Dark" : "Light"} Mode
      </button>
    </div>
  );
};

export default App;
