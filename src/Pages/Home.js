import React, { useContext } from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "../Styles/Home.css";
import { useNavigate } from "react-router-dom";
import Context from "../Components/Context";
import SearchFilter from "../Components/SearchFilter";
import Spinner from "../Components/Spinner";
import RegionFilter from "../Components/RegionFilter";

const Home = () => {
  const [countries, setCountries] = useState([]);
  const context = useContext(Context);
  const region = context.region;
  const searchTerm = context.searchTerm;
  const [isLoading, setIsLoading] = useState(false);
  let REGION_URL = "https://restcountries.com/v3.1";
  const [currentPage, setCurrentPage] = useState(1);
  const countriesPerPage = 24; // Number of countries per page

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => {
        let countriesCopy = [...res.data];
        let filteredData = searchTerm
          ? countriesCopy.filter((country) =>
              country.translations.hrv?.common
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            )
          : countriesCopy;
        console.log(res);
        setCountries(filteredData);
        setIsLoading(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [searchTerm]);

  const navigate = useNavigate();

  const openCountryInfo = (countryName) => {
    navigate(`${countryName}`);
  };

  useEffect(() => {
    console.log(region);
    if (region != "all") {
      REGION_URL = REGION_URL + "/region";
    }
    axios
      .get(`${REGION_URL}/${region}`)
      .then((res) => {
        console.log(res);
        setCountries(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [region]);

  // Pagination logic
  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = countries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="home-wrapper">
      <div className="filters-box">
        <SearchFilter />
        <RegionFilter />
      </div>
      <div className="main">
        {isLoading ? (
          currentCountries.map((country) => (
            <div
              key={country.cca2}
              className="country-card"
              onClick={() => openCountryInfo(country.name.common)}
            >
              <div className="country-img">
                <img src={country.flags.svg} />
              </div>
              <div className="country-info">
                <label>
                  {country.translations.hrv?.common || country.name.common}
                </label>
                <label>Populacija: {country.population}</label>
                <label>Region: {country.region}</label>
                <label>Glavni grad: {country.capital}</label>
              </div>
            </div>
          ))
        ) : (
          <Spinner />
        )}
      </div>
      <div className="pagination">
        {Array.from(
          { length: Math.ceil(countries.length / countriesPerPage) },
          (_, index) => (
            <button key={index} onClick={() => paginate(index + 1)}>
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};
export default Home;
