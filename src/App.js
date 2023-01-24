import './App.css';
import Home from './Pages/Home';
import Navbar from './Components/Navbar';
import CountryInfo from './Pages/CountryInfo';
import {BrowserRouter, BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { useState } from 'react';
import Context from './Components/Context';
import SearchFilter from './Components/SearchFilter';

function App() {


  const[searchTerm,setSearchTerm] = useState("");

  return (
    <div className='main-wrapper'>
      <BrowserRouter>
      <Context.Provider value={{searchTerm,setSearchTerm}}>
        <Navbar/>
        <SearchFilter/>
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
