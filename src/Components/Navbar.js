import React from 'react'
import "../Styles/Navbar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import moon from "../Images/moon.png"

const Navbar = () => {






  return (
        <nav className='nav'>
          <div>
            <a href=''><h1>Where in the world?</h1></a>
          </div>
          <div>
            <img src={moon}/><label>Dark Mode</label>
          </div>
        </nav>
  )
}

export default Navbar