import React from 'react'
import { useState } from 'react';
import axios from 'axios'
import { RenderCity } from './RenderCity';
import '../Style/City.css'
import styles from '../Style/City.module.css'


export const City = ({ APIkey, cityInfo }) => {

  const [citiesData, setcitiesData] = useState([]); // Displayed data cities
  const [favoriteLocations, setFavoriteLocations] = useState([]); // Favorite cities
  const [customCity, setCustomCity] = useState('') // Custom entered city


  // Function that adds a city if it is not in the citiesData
  const toggleCitySelection = (city) => {
    setcitiesData((citiesData) =>
      citiesData.some((c) => c.name === city.name)
        ? citiesData.filter((c) => c.name !== city.name) // If the city is in the list, filter it out
        : [...citiesData, city] // If the city is not in the list, add it
    );
  };

  // Function that adds a city to current weather
  const addCityToCurrentWeather = (city) => {
    if (!citiesData.some((c) => c.name === city.name)) {
      setcitiesData((citiesData) => [...citiesData, city]);
    } else alert('The city is already displayed.')
    setCustomCity('');
  };


   // Function that removes a city from the list
   const removeCity = (city) => {
    setcitiesData((citiesData) => citiesData.filter((c) => c !== city));
  };


  // Function to add a custom city to citiesData
  const addCustomCity = (event) => {
    event.preventDefault();
    if (customCity.trim()) {
        axios // Calling the API with the city written in the input field
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
          alert('The name of the city/county you wanted to search is not in "https://openweathermap.org/api" database')
          console.log(err);
        });
    }
  };

return (
    <>

    {/* Inside this div there is a preset of cities to quickly display information about them and an input field to search for a "custom" city */}
      <div> 
        <h3>Examples of cities to display information about:</h3>
        {cityInfo && cityInfo.map((city) => ( // "cityInfo &&" acts as a null or undefined check before using the map function
          <div key={city.name} className='padding-bottom-1'>
           <input
             type="checkbox"
             value={city}
             checked={citiesData.includes(city)} // Check if the city is selected
             onChange={() => toggleCitySelection(city)} // Toggle the selection of the city when the checkbox is clicked
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
                onChange={(event) => setCustomCity(event.target.value)} // customCity gets the value entered in the input
              />
            </label>
            <button type="submit">View</button>
        </div>
      </form>
      </div>



    {/* Rendering the current weather for selected cities */}
      <div>
       {citiesData.length > 0 && (
        <>
          <h1 className='padding-top-3'>Current weather</h1>
            {citiesData.map((city) => (
              <div className={`renderCityBox ${
                city.weather === 'Clear' ? styles.clear : // if the value of "weather" matches any of these words 
                city.weather === 'Fog' ? styles.fog :     // the div will get as background an image associated with the word (like a theme)
                city.weather === 'Clouds' ? styles.clouds :
                city.weather === 'Rain' ? styles.rain : styles.default}`} 
              >
               <button className='removeButton' onClick={() => removeCity(city)}>X</button>
               <button className='favoriteButton'
                       onClick={() => {
                       if (!favoriteLocations.some((loc) => loc.name === city.name)) {
                         setFavoriteLocations([...favoriteLocations, city]);
                         } 
                         else alert('This city is already added to favorites.') }}>❤
               </button>
              <RenderCity city={city} />
              </div>  
              ))}
       </>)}
      </div>


    {/* Rendering the current weather for your favorite cities */}
    <div className='padding-bottom-5'>
      <h1 className='padding-top-3'>Your favorite cities</h1>
        {favoriteLocations.map((location) => (
          <div className={`renderCityBoxFavorite ${
               location.weather === 'Clear' ? styles.clear : // if the value of "weather" matches any of these words 
               location.weather === 'Fog' ? styles.fog :     // the div will get as background an image associated with the word (like a theme)
               location.weather === 'Clouds' ? styles.clouds :
               location.weather === 'Rain' ? styles.rain : styles.default}`}>
          <button className='removeButton' onClick={() =>
              setFavoriteLocations(favoriteLocations.filter((x) => x !== location))}>X
          </button>
          <RenderCity key={location.name} city={location} />
          </div>
        ))}
    </div>
 </>
)}
