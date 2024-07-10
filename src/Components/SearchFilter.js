import React, { useContext } from "react";
import "../Styles/SearchFilter.css";
import Context from "./Context";

const SearchFilter = () => {
  const context = useContext(Context);
  const setSearchTerm = context.setSearchTerm;

  const getSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="search-box">
      <input
        type="text"
        id="myInput"
        onkeyup="myFunction()"
        placeholder="Pretraži državu..."
        onChange={(e) => getSearchTerm(e)}
      ></input>
    </div>
  );
};

export default SearchFilter;
