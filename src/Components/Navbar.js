import React, { useContext, useState } from 'react'
import "../Styles/Navbar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import leftArrrowDark from  "../Images/left-arrow-dark.png"
import Context from './Context'
import { Link } from 'react-router-dom'
import { faMoon } from '@fortawesome/free-solid-svg-icons'



const Navbar = () => {

  const context = useContext(Context);
  const setTheme = context.setTheme;
  const theme = context.theme;
  const setArrow = context.setArrow;
  const setThemeColorText = context.setThemeColorText;
  const themeColorText = context.themeColorText;
  


  const toggleTheme = ()=>{
    setTheme((curr)=>(curr == 'main-wrapper'? "main-wrapper-dark":"main-wrapper"));
    setThemeColorText((curr)=>(curr=='Light'? "Dark": "Light"));
  }



  return (
        <nav className='nav'>
          <div>
            <Link to="/"><h1>Where in the world?</h1></Link>
          </div>
          <div>
            <FontAwesomeIcon className='moon' icon={faMoon} onClick={()=>toggleTheme()} /><label className='theme-color-text' onClick={()=>toggleTheme()}>{themeColorText} Mode</label>
          </div>
        </nav>
  )
}

export default Navbar