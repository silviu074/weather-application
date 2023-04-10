import React from 'react'
import { useState } from 'react';
import axios from 'axios'
import { RenderCity } from './RenderCity';
import '../Style/City.css'


export const City = ({ APIkey, cityInfo }) => {

  const [favoriteCities, setFavoriteCities] = useState([]);
  const [customCity, setCustomCity] = useState('')

  const toggleCitySelection = (city) => {
    setFavoriteCities((favoriteCities) =>
      favoriteCities.some((c) => c.name === city.name)
        ? favoriteCities.filter((c) => c.name !== city.name)
        : [...favoriteCities, city]
    );
  };

  const addCityToFavorite = (city) => {
    // Check if the custom city is not already in the list of favorite cities
    if (!favoriteCities.some((c) => c.name === city.name)) {
      // Add the new city to the list of favorite cities
      setFavoriteCities((favoriteCities) => [...favoriteCities, city]);
    }
    // Clear the custom city input
    setCustomCity('');
  };

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
          addCityToFavorite(newCity);
        })
        .catch(err => {
          alert('The name of the city you wanted to search is invalid')
          console.log(err);
        });
    }
  };

  // Function to remove a city from the list of selected cities
  const removeCity = (city) => {
    setFavoriteCities((favoriteCities) => favoriteCities.filter((c) => c !== city));
  };

  return (
    <div>
      <h3>Examples of cities to display information about:</h3>

      {/* "cityInfo &&" acts as a null or undefined check before using the map function */}
      {cityInfo && cityInfo.map((city) => (
        <div key={city.name} className='padding-bottom-1'>
          <input
            type="checkbox"
            value={city}
            // Check if the city is selected
            checked={favoriteCities.includes(city)}
            // Toggle the selection of the city when the checkbox is clicked
            onChange={() => toggleCitySelection(city)}
          />
          {city.name}
        </div>
      ))}

      <form onSubmit={addCustomCity}>
        <label>
          Search another city: 
          <input
            type="text"
            placeholder="Type here"
            value={customCity}
            onChange={(event) => setCustomCity(event.target.value)}
          />
        </label>
        <button type="submit">View</button>
      </form>
      {/* Rendering the Favorite cities */}
      {favoriteCities.length > 0 && (
        <>
          <h2>Favorites:</h2>
          <ul>
            {favoriteCities.map((city) => (
              <div className='renderCityBox'>
                <RenderCity city={city} />
                <button className='removeButton' onClick={() => removeCity(city)}>X</button>
                </div>  
    ))}
  </ul>
</>
)}
  </div>
  )
}
