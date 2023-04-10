import React from 'react'
import styles from '../Style/City.module.css'

export const RenderCity = (data) => {
  
  const kelvin = data.city.temperature
  const celsius = Math.round(kelvin - 273.15);
  const fahrenheit = Math.round((celsius * 1.8) + 32);

  return (
    <div className={
          data.city.weather === 'Clear' ? styles.clear :
          data.city.weather === 'Fog' ? styles.fog :
          data.city.weather === 'Clouds' ? styles.clouds :
          data.city.weather === 'Rain' ? styles.rain : styles.default}>
      <h2>{data.city.name}</h2>
      {`Description: ${data.city.weather}`} <br/>
      {`Detailed description: ${data.city.weatherDescription}`} <br/>
      {`Temperature: ${fahrenheit} °F / ${celsius} °C`} <br/>
      {`Humidity: ${data.city.humidity}%`} <br/>
      {`Wind speed: ${data.city.windSpeed} km/h`}
    </div>
  )
}
