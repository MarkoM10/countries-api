import React, { useContext } from "react";
import "../Styles/RegionFilter.css";
import Context from "./Context";

const RegionFilter = () => {
  const context = useContext(Context);
  const setRegion = context.setRegion;

  function getRegion(e) {
    setRegion(e.target.value);
  }

  return (
    <div className="region-box">
      <select id="region" onChange={(e) => getRegion(e)}>
        <option value="all">Filtriraj po regionu</option>
        <option value="africa">Afrika</option>
        <option value="america">Amerika</option>
        <option value="asia">Azija</option>
        <option value="europe">Evropa</option>
        <option value="oceania">Okeanija</option>
      </select>
    </div>
  );
};

export default RegionFilter;
