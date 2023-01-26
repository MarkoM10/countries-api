import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useFetcher, useParams } from 'react-router-dom';
import Context from '../Components/Context';
import "../Styles/CountryInfo.css"
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Spinner from '../Components/Spinner';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons'

const CountryInfo = () => {

    const {name} = useParams();
    const context = useContext(Context);
    const arrow = context.arrow;

    const[country,setCountry] = useState({});
    const[isLoading,setIsLoading] = useState(false);
    // const[borders,setBorders] = useState(false);
    
    

    
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
  //   if(isLoading){
  //       if("borders" in country){
  //         setBorders(true);
  //       }
  //   }else{
  //     console.log("error")
  //   } 
  // },[borders])

  

  return (
    <div className='country-info-main'>
      {isLoading?(
            <div className='country-grid'>
              <div className='image-grid'>
                <Link to="/" className='link-style'>
                  <div className='back-btn'>
                    <FontAwesomeIcon className="back-icon" icon={faArrowLeftLong} />
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
                {/* <div className='border-country'>
                  <label>Border countries: </label>
                  {country.borders.map(border=>
                    <div className='border-country-btn'>{border}</div>
                  )}
                </div> */}
              </div>
            </div>
          )
          :(
            <Spinner/>
          )
      }
    </div>
  )
}

export default CountryInfo