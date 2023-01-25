import './App.css';
import Home from './Pages/Home';
import Navbar from './Components/Navbar';
import CountryInfo from './Pages/CountryInfo';
import {BrowserRouter, BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { useState } from 'react';
import Context from './Components/Context';
import SearchFilter from './Components/SearchFilter';
import RegionFilter from './Components/RegionFilter';
import leftArrow from "../src/Images/left-arrow.png"

function App() {


  const[searchTerm,setSearchTerm] = useState("");
  const[region,setRegion] = useState("");
  const[themeColor,setThemeColor]=useState("main-wrapper");
  const[arrow,setArrow]=useState(leftArrow);
  
  console.log(region)

  return (
    <div className={themeColor}>
      <BrowserRouter>
      <Context.Provider value={{searchTerm,setSearchTerm,region,setRegion,setThemeColor,arrow,setArrow}}>
        <Navbar/>
        <div className='upper-part'>
            <SearchFilter/>
            <RegionFilter/>
          </div>
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
