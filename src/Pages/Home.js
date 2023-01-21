import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import "../Styles/Home.css"

const Home = () => {


        const[countries,setCountries] = useState([]);

        useEffect(()=>{
            axios.get("https://restcountries.com/v3.1/all")
            .then(res=>{
                console.log(res);
                setCountries(res.data)
            }).catch(err=>{
                console.log(err)
            })
        },[])

        // console.log(countries.map(country=>country.name.common))


  return (
    <div className='main'>
        {countries.map(country=>
        <div className='country-card'>
            <div className='country-img'>
                <img src={country.flags.png}/>
            </div>
            <div className='country-info'>
                <label>{country.name.common}</label>
                <label>Population: {country.population}</label>
                <label>Region: {country.region}</label>
                <label>Capital: {country.capital}</label>
            </div>
        </div>
            )}
    </div>
  )
}

export default Home