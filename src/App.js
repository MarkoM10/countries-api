import './App.css';
import Home from './Pages/Home';
import Navbar from './Components/Navbar';
import CountryInfo from './Pages/CountryInfo';
import {BrowserRouter, BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { createContext, useState } from 'react';
import Context from './Components/Context';
import SearchFilter from './Components/SearchFilter';
import RegionFilter from './Components/RegionFilter';
import leftArrow from "../src/Images/left-arrow.png"

function App() {



  const[searchTerm,setSearchTerm] = useState("");
  const[region,setRegion] = useState("allCountries");
  const[theme,setTheme]=useState("main-wrapper");
  const[arrow,setArrow]=useState(leftArrow);
  const[themeColorText,setThemeColorText] = useState("Light");
  

  
  return (
    <div className={theme}>
      <BrowserRouter>
        <Context.Provider value={{searchTerm,setSearchTerm,region,setRegion,setTheme,arrow,setArrow,theme,setThemeColorText,themeColorText}}>
          <Navbar/>
              <Routes>
                <Route path='/' index element={<Home/>}/>
                <Route path=':name' element={<CountryInfo/>}/>
              </Routes>
            </Context.Provider>
      </BrowserRouter>
    </div>
  );
}
export default App;
