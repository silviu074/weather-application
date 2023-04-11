import React from 'react'
import '../Style/City.css'

export const RenderCity = (data) => {
  
  const kelvin = data.city.temperature
  const celsius = Math.round(kelvin - 273.15);
  const fahrenheit = Math.round((celsius * 1.8) + 32);

  return (
    <div>
      <div className='cityTitle'>{data.city.name}</div>
      {`Description: ${data.city.weather}`} <br/>
      {`Detailed description: ${data.city.weatherDescription}`} <br/>
      {`Temperature: ${fahrenheit} °F / ${celsius} °C`} <br/>
      {`Humidity: ${data.city.humidity}%`} <br/>
      {`Wind speed: ${data.city.windSpeed} km/h`}
    </div>
  )
}
