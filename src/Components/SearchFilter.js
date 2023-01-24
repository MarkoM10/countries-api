import React, { useContext } from 'react'
import "../Styles/SearchFilter.css"
import Context from './Context';

const SearchFilter = () => {
    
    const context = useContext(Context);
    const setSearchTerm = context.setSearchTerm;


    const getSearchTerm = (e) =>{
        setSearchTerm(e.target.value)
    }




  return (
    <div>
        <input type="text" id="myInput" onkeyup="myFunction()" placeholder="Search for country.." onChange={(e)=>getSearchTerm(e)}></input>
    </div>
  )
}

export default SearchFilter