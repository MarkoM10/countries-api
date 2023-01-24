import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Context from '../Components/Context';
import "../Styles/CountryInfo.css"
import back from "../Images/left-arrow.png"
import { Link } from 'react-router-dom';

const CountryInfo = () => {

    const {name} = useParams();


    const[country,setCountry] = useState({});
    const[isLoading,setIsLoading] = useState(false);

    
    useEffect(()=>{
            axios.get(`https://restcountries.com/v3.1/name/${name}`)
            .then(res=>{
                setCountry(res.data[0])
                setIsLoading(true);
            }).catch(err=>{
                console.log(err);
            })
    },[name])

    // useEffect(()=>{
    //       async function getCountry(){
    //         try{
    //           const res = await axios.get(`https://restcountries.com/v3.1/name/${name}`);
    //           console.log(res);
    //           setCountry(res.data[0]);
    //         }catch(error){
    //           console.error(error);
    //         }
    //       }
    //       getCountry();
    // },[])

    console.log(country)





  return (
    <div>
      {isLoading?(
            <div className='country-grid'>
              <div className='image-grid'>
                <Link to="/" style={{ textDecoration: 'none' }}>
                  <div className='back-btn'>
                    <img className='back-icon' src={back}/>
                    <label>Back</label>
                  </div>
                </Link>
                <img className='country-info-img' src={country.flags.svg}/>
              </div>
              <div className='country-info-grid'>
                <div className='left-side-info'>
                  <label>{country.name.common}</label>
                  <label><span>Population: </span>{country.population}</label>
                  <label><span>Region: </span>{country.region}</label>
                  <label><span>Subregion: </span>{country.subregion}</label>
                  <label><span>Continents: </span>{country.continents}</label>
                  <label><span>Capital: </span>{country.capital}</label>
                </div>
                <div className='right-side-info'>
                  <label><span>Top Level Domain: </span>{country.tld[0]}</label>
                  {/* <label><span>Currencies: </span>{country.currencies.EUR.name}</label> */}
                  <label><span>Lanugages: </span>{Object.values(country.languages)+" "}</label>
                </div>
                <div className='border-country'>
                  <label>Border countries: </label>
                  {country.borders.map(border=>
                    <div className='border-country-btn'>{border}</div>
                  )}
                </div>
              </div>
            </div>
          )
          :(
            <label>loading...</label>
          )
      }
    </div>
  )
}

export default CountryInfo