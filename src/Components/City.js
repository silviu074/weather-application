import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios'
import { RenderCity } from './RenderCity';
import '../Style/City.css'
import styles from '../Style/City.module.css'


export const City = ({ APIkey, cityInfo }) => {

  const [citiesData, setcitiesData] = useState([]);
  const [customCity, setCustomCity] = useState('')
  const [favoriteLocations, setFavoriteLocations] = useState([]);

  const toggleCitySelection = (city) => {
    setcitiesData((citiesData) =>
      citiesData.some((c) => c.name === city.name)
        ? citiesData.filter((c) => c.name !== city.name)
        : [...citiesData, city]
    );
  };

  const addCityToCurrentWeather = (city) => {
    // Check if the custom city is not already in the list of favorite cities
    if (!favoriteLocations.some((c) => c.name === city.name)) {
      // Add the new city to the list of favorite cities
      setFavoriteLocations((favoriteLocations) => [...favoriteLocations, city]);
    }
    // Clear the custom city input
    setCustomCity('');
  };

   // Function that removes a city from the list of selected cities
   const removeCity = (city) => {
    setcitiesData((citiesData) => citiesData.filter((c) => c !== city));
  };


  // Function to add a custom city 
  const addCustomCity = (event) => {
    event.preventDefault();
    // Check if the custom city input is not empty or just whitespace
    if (customCity.trim()) {
      // Getting the object information about the searched city
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${customCity.trim()}&APPID=${APIkey}`)
        .then(response => {
          const newCity = {
            name: response.data.name,
            weather: response.data.weather[0].main,
            weatherDescription: response.data.weather[0].description,
            temperature: response.data.main.temp,
            humidity: response.data.main.humidity,
            windSpeed: response.data.wind.speed,
          };
          addCityToCurrentWeather(newCity);
        })
        .catch(err => {
          alert('The name of the city you wanted to search is invalid')
          console.log(err);
        });
    }
  };

 

  return (
    <div>
      {/* Inside this div there is information about the selected cities and the searched ones */}
      <div> 
      <h3>Examples of cities to display information about:</h3>
      {/* "cityInfo &&" acts as a null or undefined check before using the map function */}
      {cityInfo && cityInfo.map((city) => (
        <div key={city.name} className='padding-bottom-1'>
          <input
            type="checkbox"
            value={city}
            // Check if the city is selected
            checked={citiesData.includes(city)}
            // Toggle the selection of the city when the checkbox is clicked
            onChange={() => toggleCitySelection(city)}
          />
          {city.name}
        </div>
      ))}
      <form onSubmit={addCustomCity}>
        <div>
        <label>
          Search another city/county: 
          <input
            type="text"
            placeholder="Type here"
            value={customCity}
            onChange={(event) => setCustomCity(event.target.value)}
          />
        </label>
        <button type="submit">View</button>
        </div>
      </form>
      </div>
      {/* Rendering the current weather for selected cities */}
      {citiesData.length > 0 && (
        <>
          <h1 className='padding-top-3'>Current weather</h1>
          <ul>
            {citiesData.map((city) => (
              <div className={`renderCityBox ${
                city.weather === 'Clear' ? styles.clear :
                city.weather === 'Fog' ? styles.fog :
                city.weather === 'Clouds' ? styles.clouds :
                city.weather === 'Rain' ? styles.rain : styles.default}`}>
                <button className='removeButton' onClick={() => removeCity(city)}>X</button>
                <button
  className='favoriteButton'
  onClick={() => {
    if (!favoriteLocations.some((loc) => loc.name === city.name)) {
      setFavoriteLocations([...favoriteLocations, city]);
    } else alert('This city is already added to favorites')
  }}
>
  ❤
</button>
              <RenderCity city={city} />
          </div>  
    ))}
  </ul>
</>
)}


<h1 className='padding-top-3'>Your favorite locations</h1>
    {favoriteLocations.map((location) => (
      
      <div className={`renderCityBoxFavorite ${
                location.weather === 'Clear' ? styles.clear :
                location.weather === 'Fog' ? styles.fog :
                location.weather === 'Clouds' ? styles.clouds :
                location.weather === 'Rain' ? styles.rain : styles.default}`}>
        <button className='removeButton' onClick={() =>
              setFavoriteLocations(favoriteLocations.filter((x) => x !== location))}>💔
        </button>
        <RenderCity key={location.name} city={location} />
      </div>
    ))}
</div>
  )
}
