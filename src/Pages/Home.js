import React, { useContext } from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "../Styles/Home.css";
import { useNavigate } from "react-router-dom";
import Context from "../Components/Context";
import SearchFilter from "../Components/SearchFilter";
import Spinner from "../Components/Spinner";
import RegionFilter from "../Components/RegionFilter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const context = useContext(Context);

  const favorites = context.favorites;
  const setFavorites = context.setFavorites;
  const region = context.region;
  const searchTerm = context.searchTerm;
  const [isLoading, setIsLoading] = useState(false);
  let REGION_URL = "https://restcountries.com/v3.1";
  const [currentPage, setCurrentPage] = useState(1);
  const countriesPerPage = 24;

  const [countries, setCountries] = useState([]);
  //Get request ka REST COUNTRIES API za prikupljanje svih podataka o drzavama
  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => {
        console.log("Resonse:", res);
        //Kreiranje kopije niza
        let countriesCopy = [...res.data];
        //Filtriranje niza ukoliko korisnik unese naziv drzave u okviru pretrage
        let filteredData = searchTerm
          ? countriesCopy.filter((country) =>
              country.translations.hrv?.common
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            )
          : countriesCopy;

        //Filter u JS funkcionise tako sto vraca novi niz koji je ispunio zadati uslov, u ovom slucaju uslov je bio da vrati sve drzave ciji naziv se poklapa sa unetim
        //ukoliko korisnik nije uneo search term, znaci da treba da vratimo celu listu drzava
        setCountries(filteredData);
        setIsLoading(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [searchTerm]);

  const navigate = useNavigate();

  const openCountryInfo = (countryName) => {
    navigate(`/country/${countryName}`);
  };

  //Get request koji vraca listu drzava iz odabranih regiona u okviru regionFilter komponente
  useEffect(() => {
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

  //Funkcija zaduzena za kreiranje liste od odabranih omiljenih drzava
  const favoritesCountry = (country) => {
    setFavorites((prevFavorites) => {
      console.log(prevFavorites);
      if (prevFavorites.some((fav) => fav.cca2 == country.cca2)) {
        return prevFavorites.filter((fav) => fav.cca2 !== country.cca2);
      } else {
        return [...prevFavorites, country];
      }
    });
  };

  return (
    <div className="home-wrapper">
      <div className="filters-box">
        <SearchFilter />
        <div className="favorites-box" onClick={() => navigate("favorites")}>
          <label>
            OMILJENE
            <span>
              {" "}
              <FontAwesomeIcon icon={faGlobe} />
            </span>
          </label>
        </div>
        <RegionFilter />
      </div>
      <div className="main">
        {isLoading ? (
          currentCountries.map((country) => (
            <div key={country.cca2} className="country-card">
              <div
                className="country-img"
                onClick={() => openCountryInfo(country.name.common)}
              >
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
              <div className="favoritesIcon">
                <FontAwesomeIcon
                  style={{ cursor: "pointer" }}
                  icon={
                    favorites.some((fav) => fav.cca2 === country.cca2)
                      ? fasHeart
                      : farHeart
                  }
                  onClick={() => favoritesCountry(country)}
                />
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
