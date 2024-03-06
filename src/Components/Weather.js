import React, { useEffect, useState } from "react";

const weather_url = "https://api.open-meteo.com/v1/forecast?";
const temp_units = "fahrenheit";
const forecast_days = 2;
const hourly = "apparent_temperature";

async function getWeather(city) {
  const params = new URLSearchParams({
    latitude: city.lat,
    longitude: city.lon,
    forecast_days: forecast_days,
    temperature_unit: temp_units,
    hourly: hourly
  });

  const search_url = weather_url + params.toString();

  console.log(search_url);

  try {
    const response = await fetch(search_url);
    const data = await response.json();
    return data.hourly;
  } catch (error) {
    console.error("Error fetching weather data: " + error);
    return "";
  }
}

const Weather = ({ currentCity }) => {

  const [temps, setTemps] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      var weather = await getWeather(currentCity);
      setTemps(weather.apparent_temperature);
    };
    fetchData();
  }, [currentCity]);

  const date = new Date();
  const hours = date.getHours();

  return (
    <div className="weather">
      <div className="row weather-header">
        <div className="col-6">Time</div>
        <div className="col-6">Temperature</div>
      </div>
      {temps.slice(hours, hours + 17).map((temp, index) => {
        const curHours = hours + index;
        const timeString = curHours < 12 ? curHours + ":00 AM" : 
                                           curHours < 24 ? (curHours - 12) + ":00 PM" : 
                                                           ((curHours - 24) === 0 ? (curHours - 12) : (curHours - 24)) + ":00 AM";
        const tempString = temp + "°F";
        return (
          <div key={index} className="weather-item row">
            <div className="col-6">{timeString}</div>
            <div className="col-6">{tempString}</div>
            {/* <div>{temps[index]}</div> */}
          </div>
        );
      })}
    </div>
  );
}

export default Weather;