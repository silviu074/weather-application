import React from 'react'
import { useState } from 'react';
import axios from 'axios'


export const City = ({ APIkey, cityInfo }) => {

  const [favoriteCities, setFavoriteCities] = useState([]);
  const [customCity, setCustomCity] = useState('')
  const [customCityData, setCustomCityData] = useState([])
  const [cityDataList, setCityDataList] = useState([]);

  const toggleCitySelection = (city) => {
    setFavoriteCities((favoriteCities) =>
      // If the city is already selected, remove it from the list
      favoriteCities.includes(city)
        ? favoriteCities.filter((c) => c !== city)
        // If the city is not selected, add it to the list
        : [...favoriteCities, city]
    );
  };

  const addCustomCity = (event) => {
  event.preventDefault();
  // Check if the custom city input is not empty or just whitespace
  if (customCity.trim()) {
    // Add the custom city to the list of selected cities
    setFavoriteCities((favoriteCities) => [...favoriteCities, customCity.trim()]);
    // Clear the custom city input
    setCustomCity('');
  }
};

  // Function to remove a city from the list of selected cities
  const removeCity = (city) => {
    setFavoriteCities((favoriteCities) => favoriteCities.filter((c) => c !== city));
  };

  // preparing for useEffect here
  const submitButton = () => {
    console.log(customCity)
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${customCity}&APPID=${APIkey}`)
        .then(response => {
          setCustomCityData(response.data)

          // Checking if the customCityData is empty, if its not -> add it to the list

          if (customCityData) {
          setCityDataList(prevList => [...prevList, customCityData])}
        })
        .catch(err => {
          setCustomCityData([])
            console.log(err)
        })

   console.log(customCityData)
   console.log(cityDataList)

  }

  return (
    <div>
    <h2>Examples of cities to add to your favorites:</h2>

    {/* cityInfo && acts as a null or undefined check before using the map function */}

    {cityInfo && cityInfo.map((city) => (
      <div key={city.name}>
        <input
          type="checkbox"
          value={city.name}
          // Check if the city is selected
          checked={favoriteCities.includes(city.name)}
          // Toggle the selection of the city when the checkbox is clicked
          onChange={() => toggleCitySelection(city.name)}
        />
        {city.name}
      </div>
    ))}


     <form onSubmit={addCustomCity}>
      <label>
        Add custom city:
        <input
          type="text"
          value={customCity}
          onChange={(event) => setCustomCity(event.target.value)}
        />
      </label>
      <button type="submit" onClick={submitButton}>Add</button>
    </form>
    {/* Rendering the Favorite cities */}
    {favoriteCities.length > 0 && (
      <>
        <h2>Favorites:</h2>
        <ul>
          {favoriteCities.map((city) => (
            <li key={city}>
              {city}
              {/* Creating a button to remove any city */}
              <button onClick={() => removeCity(city)}>X</button>
            </li>
          ))}
        </ul>
      </>
    )}
  </div>
  )
}
