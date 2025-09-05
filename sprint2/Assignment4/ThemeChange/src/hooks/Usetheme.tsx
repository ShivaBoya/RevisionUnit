import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("app-theme") as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.body.className = savedTheme; 
      document.body.className = "light"; 
    }
  }, []);

  const toggleTheme = () => {
    const newTheme: Theme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("app-theme", newTheme);
    document.body.className = newTheme;
  };

  return { theme, toggleTheme };
}
