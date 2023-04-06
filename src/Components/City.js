import React from 'react'
import { useState } from 'react';

const presetCities = ['New York', 'London', 'Paris', 'Tokyo', 'Sydney'];

export const City = () => {

  const [favoriteCities, setFavoriteCities] = useState([]);
  const [customCity, setCustomCity] = useState('');

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

  return (
    <div>
    <h2>Examples of cities to add to your favorites:</h2>
    {/* Render a checkbox and label for each preset city */}
    {presetCities.map((city) => (
      <div key={city}>
        <input
          type="checkbox"
          value={city}
          // Check if the city is selected
          checked={favoriteCities.includes(city)}
          // Toggle the selection of the city when the checkbox is clicked
          onChange={() => toggleCitySelection(city)}
        />
        {city}
      </div>
    ))}


    <form onSubmit={addCustomCity}>
      <label>
        Add custom city:
        {/* Set the value of a custom city */}
        <input type="text" value={customCity} onChange={(event) => setCustomCity(event.target.value)} />
      </label>
      <button type="submit">Add</button>
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
