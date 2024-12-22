import React, { useContext } from "react";
import "../Styles/Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Context from "./Context";
import { useNavigate } from "react-router-dom";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import logo from "../Images/Svet na dlanu.png";
import logoWhite from "../Images/Svet na dlanu beli.png";

const Navbar = () => {
  const context = useContext(Context);
  const setTheme = context.setTheme;
  const theme = context.theme;
  const setThemeColorText = context.setThemeColorText;
  const themeColorText = context.themeColorText;

  const toggleTheme = () => {
    setTheme((curr) =>
      curr === "main-wrapper" ? "main-wrapper-dark" : "main-wrapper"
    );
    setThemeColorText((curr) => (curr === "Svetli" ? "Tamni" : "Svetli"));
  };

  const navigate = useNavigate();

  return (
    <nav className="nav">
      <div onClick={() => navigate("/")}>
        <img
          alt="moon icon"
          src={theme === "main-wrapper-dark" ? logoWhite : logo}
        />
        <h1>Svet na dlanu</h1>
      </div>
      <div>
        <FontAwesomeIcon
          className="moon"
          icon={faMoon}
          onClick={() => toggleTheme()}
        />
        <label className="theme-color-text" onClick={() => toggleTheme()}>
          {themeColorText} režim
        </label>
      </div>
    </nav>
  );
};

export default Navbar;
