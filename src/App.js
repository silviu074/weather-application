
import axios from 'axios'
import React, { useState, useEffect} from 'react'
import { City } from './Components/City'
import '../src/Style/MainPage.css'



function App() {

  const [cityInfo, setCityInfo] = useState()
  const APIkey = `621f1f003c7991f2765209be469931c2`
  const presetCities = ['New York', 'London', 'Paris', 'Tokyo', 'Sydney'];

  // API request

  useEffect(() => {
    const fetchData = async () => {
      const data = await Promise.all(
        presetCities.map(async (city) => {
          try {
            const response = await axios.get(
              `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${APIkey}`
            );
  
            return {
              name: response.data.name,
              weatherDescription: response.data.weather[0].description,
              temperature: response.data.main.temp,
              humidity: response.data.main.humidity,
              windSpeed: response.data.wind.speed,
            };
          } catch (error) {
            console.error(error);
            return null;
          }
        })
      );
  
      setCityInfo(data.filter((city) => city !== null));
    };
  
    fetchData();
  }, []);
  

  return (
    <div>
      <h1>Weather app</h1>
      <City APIkey={APIkey} cityInfo={cityInfo}/>
    </div>
  );
}

export default App;
