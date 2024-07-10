import React, { useContext, useState } from "react";
import "../Styles/Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import leftArrrowDark from "../Images/left-arrow-dark.png";
import Context from "./Context";
import { Link, useNavigate } from "react-router-dom";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import logo from "../Images/Svet na dlanu.png";
import logoWhite from "../Images/Svet na dlanu beli.png";

const Navbar = () => {
  const context = useContext(Context);
  const setTheme = context.setTheme;
  const theme = context.theme;
  const setArrow = context.setArrow;
  const setThemeColorText = context.setThemeColorText;
  const themeColorText = context.themeColorText;

  const toggleTheme = () => {
    setTheme((curr) =>
      curr == "main-wrapper" ? "main-wrapper-dark" : "main-wrapper"
    );
    setThemeColorText((curr) => (curr == "Svetli" ? "Tamni" : "Svetli"));
  };

  const navigate = useNavigate();

  console.log(theme);

  return (
    <nav className="nav">
      <div onClick={() => navigate("/")}>
        <img src={theme == "main-wrapper-dark" ? logoWhite : logo} />
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
