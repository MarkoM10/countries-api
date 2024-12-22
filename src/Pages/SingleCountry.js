import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../Styles/CountryInfo.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Spinner from "../Components/Spinner";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";

const SingleCountry = () => {
  const { name } = useParams();

  const [country, setCountry] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/name/${name}`)
      .then((res) => {
        setCountry(res.data[0]);
        setIsLoading(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [name]);

  return (
    <div className="country-info-main">
      {isLoading ? (
        <div className="country-grid">
          <div className="image-grid">
            <div className="back">
              <Link to="/" className="link-style">
                <div className="back-btn">
                  <FontAwesomeIcon
                    className="back-icon"
                    icon={faArrowLeftLong}
                  />
                  <label>Nazad</label>
                </div>
              </Link>
            </div>
            <div className="img-box">
              <img
                className="country-info-img"
                src={country.flags.svg}
                alt="country info img"
              />
            </div>
          </div>
          <div className="country-info-grid">
            <div className="emtpy-box"></div>
            <div className="info-box">
              <div className="left-side-info">
                <label>
                  {country.translations.hrv?.common || country.name.common}
                </label>
                <label>
                  <span>Populacija: </span>
                  {country.population}
                </label>
                <label>
                  <span>Region: </span>
                  {country.region}
                </label>
                <label>
                  <span>Kontinent: </span>
                  {country.continents}
                </label>
                <label>
                  <span>Glavni grad: </span>
                  {country.capital}
                </label>
              </div>
              <div className="right-side-info">
                <label>
                  <span>Domen: </span>
                  {country.tld[0]}
                </label>
                <label className="languages">
                  <span>Jezici: </span>
                  {Object.values(country.languages) + " "}
                </label>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default SingleCountry;
