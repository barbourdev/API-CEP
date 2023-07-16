import { BsFillSunFill } from "react-icons/bs";
import { FaRegMoon } from "react-icons/fa";
import { ApiCep } from '../ApiCep/ApiCep';
import { ThemeProvider } from 'styled-components';
import { useState } from 'react'

const lightTheme = {
  backgroundColor: "#fff",
  backgroundColorInput: "#dcdcdc",
  backgroundColorInputHover: "rgba(220, 220, 220, 0.5)",
  textColor: "#000",
};

const darkTheme = {
  backgroundColor: "#101217",
  backgroundColorInput: "#fff",
  backgroundColorInputHover: "rgba(220, 220, 220, 0.1)",
  textColor: "#fff",
  textColorInput: "#000",
};

export function App() {
  const storedTheme = localStorage.getItem("theme");
  const [isDarkMode, setIsDarkMode] = useState(storedTheme === "dark");

  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("theme", newTheme);
  };

  const iconeToggle = isDarkMode ? (
    <BsFillSunFill className="modeIcon" onClick={toggleTheme} />
  ) : (
    <FaRegMoon className="modeIcon" onClick={toggleTheme} />
  );

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme} >
      <ApiCep action={toggleTheme} iconeToggle={iconeToggle}/>
    </ThemeProvider>
  );
}

