import React, { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import CitiesBar from './Components/CitiesBar';
import Search from './Components/Search';
import Weather from './Components/Weather';

function App() {

  const citiesObj = [
    {
      name: "Houston",
      lat: 29.7604,
      lon: -95.3698
    },
    {
      name: "Dallas",
      lat: 32.7767,
      lon: -96.7970
    },
    {
      name: "Austin",
      lat: 30.2672,
      lon: -97.7431
    }
  ];

  const [cities, setCities] = useState(citiesObj);

  const [currentCity, setCurCity] = useState(citiesObj[0]);

  const errorAlert = (searchCity) => {
    alert("Could not fetch weather data for " + searchCity + ".");
  }

  return (
    <div className="P4 container">
      <CitiesBar cities={cities} currentCity={currentCity} setCurCity={setCurCity}/>
      <Search cities={cities} setCities={setCities} setCurCity={setCurCity} errorAlert={errorAlert}/>
      <Weather currentCity={currentCity}/>
    </div>
  );
}

export default App;
