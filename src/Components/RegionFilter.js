import React, { useContext, useState } from 'react'
import down from "../Images/down-arrow.png"
import "../Styles/RegionFilter.css"
import Context from './Context'

const RegionFilter = () => {

  const context = useContext(Context);
  const setRegion = context.setRegion;

  function getRegion(e){
    setRegion(e.target.value)
  }


  return (
    <div className='region-box'>
        <select id="region" onChange={(e)=>getRegion(e)}>
        <option value="allCountries">Filter by Region</option>
        <option value="africa">Africa</option>
        <option value="america">America</option>
        <option value="asia">Asia</option>
        <option value="europe">Europe</option>
        <option value="oceania">Oceania</option>
        </select>
    </div>
  )
}

export default RegionFilter