import "./App.css";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar";
import SingleCountry from "./Pages/SingleCountry";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Context from "./Components/Context";
import leftArrow from "../src/Images/left-arrow.png";
import Favorites from "./Pages/Favorites";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [region, setRegion] = useState("all");
  const [theme, setTheme] = useState("main-wrapper");
  const [arrow, setArrow] = useState(leftArrow);
  const [themeColorText, setThemeColorText] = useState("Svetli");
  const [favorites, setFavorites] = useState([]);

  return (
    <div className={theme}>
      <Router>
        <Context.Provider
          value={{
            searchTerm,
            setSearchTerm,
            region,
            setRegion,
            setTheme,
            arrow,
            setArrow,
            theme,
            setThemeColorText,
            themeColorText,
            favorites,
            setFavorites,
          }}
        >
          <Navbar />
          <Routes>
            <Route path="/" index element={<Home />} />
            <Route path="/country/:name" element={<SingleCountry />} />
            <Route path=":favorites" element={<Favorites />} />
          </Routes>
        </Context.Provider>
      </Router>
    </div>
  );
}
export default App;
