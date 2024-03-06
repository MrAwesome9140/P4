import React, { useState } from "react";

const CitiesBar = ({ cities, currentCity, setCurCity }) => {

  const onCityClick = (city) => {
    setCurCity(city);
  };

  return (
    <div className="row cities-row">
      {cities.map((city) => {
        if (city.name === currentCity.name) {
          return (
            <button className='city-button selected-city' key={city.name} onClick={() => onCityClick(city)}>
              {city.name}
            </button>
          );
        } else {
          return (
            <button className='city-button' key={city.name} onClick={() => onCityClick(city)}>
              {city.name}
            </button>
          );
        }
      })}
    </div>
  );
}

export default CitiesBar;