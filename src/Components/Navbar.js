import React, { useContext, useState } from 'react'
import "../Styles/Navbar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import moon from "../Images/moon.png"
import moonDark from "../Images/moonDark.png"
import leftArrrowDark from  "../Images/left-arrow-dark.png"
import Context from './Context'
import { Link } from 'react-router-dom'

const Navbar = () => {

  const context = useContext(Context);
  const setThemeColor = context.setThemeColor;
  const setArrow = context.setArrow;
  const[moonImg,setMoonImg] = useState(moon);
  const [status, setStatus] = useState(false);

  const changeTheme = () =>{
    setStatus(!status);
    setThemeColor("main-wrapper-dark");
    setMoonImg(moonDark);
    setArrow(leftArrrowDark);

  }


  return (
        <nav className='nav'>
          <div>
            <Link to="/"><h1>Where in the world?</h1></Link>
          </div>
          <div>
            <img src={moonImg} onClick={()=>changeTheme()}/><label>Dark Mode</label>
          </div>
        </nav>
  )
}

export default Navbar