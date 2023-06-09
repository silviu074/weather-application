
import axios from 'axios'
import React, { useState, useEffect, useMemo} from 'react'
import { City } from './Components/City'
import '../src/Style/MainPage.css'
import appLogoLight from '../src/images/appLogoLight.png'



function App() {

  const [cityInfo, setCityInfo] = useState()
  const APIkey = `621f1f003c7991f2765209be469931c2`;
  const presetCities = useMemo(() => ['New York', 'London', 'Paris', 'Tokyo', 'Sydney'], []);
  const [theme, setTheme] = useState('light');
  const [date, setDate] = useState(new Date());

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const dateString = date.toLocaleDateString(undefined, options);
  const timeString = date.toLocaleTimeString();


  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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
              weather: response.data.weather[0].main,
              weatherDescription: response.data.weather[0].description,
              temperature: response.data.main.temp,
              humidity: response.data.main.humidity,
              windSpeed: response.data.wind.speed,
            };
          } catch (error) {
            console.error(`There was a problem: ${error}`);
            return null;
          }
        })
      );
      setCityInfo(data.filter((city) => city !== null));
    };
    fetchData();
  }, [APIkey, presetCities]);

  // Implementing the light theme on body only once when the app is started
  
  useEffect(() => {
    document.body.classList.add('light-theme');
  }, []);


  // Function that changes the body colors (dark and white theme)

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    document.body.classList.toggle('light-theme');
    document.body.classList.toggle('dark-theme');
  };

  return (
    <div className={`App ${theme}`}>
      <div className="dateAndTime">
         <img className='appIcon' src={appLogoLight} alt='appLogoLight'/>
          {dateString} <br/>
          {timeString}
    </div>
      <button className="theme-toggle" onClick={toggleTheme}>
        <span className={`theme-toggle-thumb ${theme}`} />
      </button>
      <City APIkey={APIkey} cityInfo={cityInfo}/>
    </div>
  );
}

export default App;
