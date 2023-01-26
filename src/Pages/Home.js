import React, { useContext } from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import "../Styles/Home.css"
import { useNavigate } from "react-router-dom";
import Context from '../Components/Context';
import SearchFilter from '../Components/SearchFilter';
import Spinner from '../Components/Spinner';
import RegionFilter from '../Components/RegionFilter';

const Home = () => {

    
        const[countries,setCountries] = useState([]);
        const context = useContext(Context);
        const region = context.region;
        const searchTerm = context.searchTerm;  
        const[isLoading,setIsLoading] = useState(false); 
        


        useEffect(()=>{
            axios.get("https://restcountries.com/v3.1/all")
            .then(res=>{
                let countriesCopy = [...res.data];
                let filteredData = searchTerm ? countriesCopy.filter((country)=>country.name.common.toLowerCase().includes(searchTerm.toLowerCase())): countriesCopy;
                // console.log(res);
                setCountries(filteredData)
                setIsLoading(true)
            }).catch(err=>{
                console.log(err)
            })
        },[searchTerm])

        const navigate = useNavigate();

        const openCountryInfo = (countryName) =>{
            navigate(`${countryName}`);
        }

        useEffect(()=>{
            console.log(region)
            if(region===region){
                axios.get(`https://restcountries.com/v3.1/region/${region}`).
                then(res=>{
                    console.log(res);
                    setCountries(res.data)
                }).catch(err=>{
                    console.log(err);
                })
            }    
        },[region])

        console.log(countries)
        
    
  return (
    <div className='home-wrapper'>
        <div className='filters-box'>
            <SearchFilter/>
            <RegionFilter/>
        </div>
        <div className='main'>
            {isLoading?(
                countries.map(country=>
                    <div key={country.cca2} className='country-card' onClick={()=>openCountryInfo(country.name.common)}>
                        <div className='country-img'>
                            <img src={country.flags.svg}/>
                        </div>
                        <div className='country-info'>
                            <label>{country.name.common}</label>
                            <label>Population: {country.population}</label>
                            <label>Region: {country.region}</label>
                            <label>Capital: {country.capital}</label>
                        </div>
                    </div>
                            )
                        )
                :(  
                <Spinner/>
                )}
        </div>
    </div>
  )
}
export default Home