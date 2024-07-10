import React, { useContext } from "react";
import Context from "../Components/Context";
import "../Styles/Favorites.css";
import { useNavigate } from "react-router-dom";

export default function Favorites() {
  const context = useContext(Context);
  const favorites = context.favorites;
  const navigate = useNavigate();

  const openCountryInfo = (countryName) => {
    navigate(`/country/${countryName}`);
  };

  console.log(favorites);

  return (
    <div className="favorites">
      {favorites.length > 0 ? (
        <label>LISTA OMILJENIH DRŽAVA</label>
      ) : (
        <label>
          LISTA OMILJENIH DRŽAVA JE{" "}
          <span>
            <b>PRAZNA</b>
          </span>
        </label>
      )}

      <div className="favoritesWrapper">
        {favorites.map((country) => (
          <div key={country.cca2} className="favorite-card">
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
          </div>
        ))}
      </div>
    </div>
  );
}
