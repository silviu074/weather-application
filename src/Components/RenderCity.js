import React from 'react'
import '../Style/City.css'
import clearImg from '../images/clear.png';
import cloudsImg from '../images/clouds.png';
import fogImg from '../images/fog.png';
import rainImg from '../images/rain.png';
import dustImg from '../images/dust.png';
import mistImg from '../images/mist.png';
import hazeImg from '../images/haze.png';
import thunderstormImg from '../images/thunderstorm.png';
import smokeImg from '../images/smoke.png';
import snowImg from '../images/snow.png';
import drizzleImg from '../images/drizzle.png';

export const RenderCity = (data) => {
  
  // Converting the temperature from Kelvin to °C & °F
  const kelvin = data.city.temperature
  const celsius = Math.round(kelvin - 273.15);
  const fahrenheit = Math.round((celsius * 1.8) + 32);

  return (
    <div>
      
      <div className='description'>
      {`Description: ${data.city.weather}`} <br/>
      {`Detailed description: ${data.city.weatherDescription}`} <br/>
      {`Humidity: ${data.city.humidity}%`} <br/>
      {`Wind speed: ${data.city.windSpeed} km/h`}
      </div>

      <div className='temperature'>
      {`${fahrenheit} °F / ${celsius} °C`}
      </div>
      <div className='cityTitle'>
        {data.city.name}
      </div>
      <div className='icon'>
      {data.city.weather === 'Clear' && <img src={clearImg} alt='clear'/>}
      {data.city.weather === 'Clouds' && <img src={cloudsImg} alt='clouds'/>}
      {data.city.weather === 'Fog' && <img src={fogImg} alt='fog'/>}
      {data.city.weather === 'Rain' && <img src={rainImg} alt='rain'/>}
      {data.city.weather === 'Mist' && <img src={mistImg} alt='mist'/>}
      {data.city.weather === 'Dust' && <img src={dustImg} alt='dust'/>}
      {data.city.weather === 'Haze' && <img src={hazeImg} alt='haze'/>}
      {data.city.weather === 'Thunderstorm' && <img src={thunderstormImg} alt='thunderstorm'/>}
      {data.city.weather === 'Smoke' && <img src={smokeImg} alt='smoke'/>}
      {data.city.weather === 'Snow' && <img src={snowImg} alt='snow'/>}
      {data.city.weather === 'Drizzle' && <img src={drizzleImg} alt='drizzle'/>}
      </div>
    </div>
  )
}
