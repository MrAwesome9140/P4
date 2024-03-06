import React, { useState } from "react";

const geocode_url = "https://geocoding-api.open-meteo.com/v1/search?";
const num_results = 1;

async function cityToCoords(city) {
    const params = new URLSearchParams({
        name: city,
        count: num_results
    });

    const search_url = geocode_url + params.toString();

    try {
        const response = await fetch(search_url);
        const data = await response.json();
        return data.results[0];
    } catch (error) {
        console.error("Error fetching city coordinates: " + error);
        return "";
    }
}

const Search = ({ cities, setCities, setCurCity, errorAlert }) => {

    const [inputText, setInputText] = useState("");

    const onSearchClick = async () => {
        var city = await cityToCoords(inputText);
        if (city !== "") {
            const cityObj = {
                name: city.name,
                lat: city.latitude,
                lon: city.longitude
            };
            setCities([cityObj, ...cities]);
            setCurCity(cityObj);
            setInputText("");
        } else {
            errorAlert(inputText);
        }
    };

    return (
        <div className="search">
            <input className="search-box" type="text" placeholder="Search..." value={inputText} onChange={(e) => {setInputText(e.target.value)}}/>
            <button className="search-button" onClick={onSearchClick}>
                <div>+</div>
            </button>
        </div>
    );
}

export default Search;