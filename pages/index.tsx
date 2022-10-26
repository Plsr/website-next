import { useState, useEffect } from "react";

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>()

  useEffect(() => {
    setIsDarkMode(document.documentElement.classList.contains('dark'))
  }, [])

  const handleDarkModeToggleClick = () => {
    document.documentElement.classList.toggle("dark")
    localStorage.theme = isDarkMode ? 'light' : 'dark'
    setIsDarkMode(!isDarkMode)
  };

  return (
    <>
      <div>Here be home</div>
      <button onClick={handleDarkModeToggleClick}>Toggle dark mode</button>
    </>
  );
}
