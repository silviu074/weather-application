# Nomad Weather App

The goal of this project was to make a weather application as modern and as usable as possible.

This project used this [WeatherAPI](https://openweathermap.org/api)


## Built with

  * HTML 
  * CSS
  * Javascript
  * React



## Demo


https://user-images.githubusercontent.com/44822821/231320012-b530daa4-2e47-4e16-ba88-91e3f6666b3b.mp4



## Page layout


![Screenshot 2023-04-12 035830](https://user-images.githubusercontent.com/44822821/231320105-f70dcf22-95bc-4fd5-8953-d50b131c8bad.png)


## Types of weather & implementation

### Based on the API response I implement images for 8 types of weather description:

  * Clear
  * Clouds
  * Drizzle
  * Dust
  * Fog
  * Haze
  * Mist
  * Rain
  * Smoke
  * Snow
  * Thunderstorm

 ![image](https://user-images.githubusercontent.com/44822821/231320586-9919c879-2887-4b60-b0fe-7e851696c6d1.png)
 
#### They are imported as variables

```
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

```

#### If the city description matches one icon imported above, this icon will be displayed and the rest will be ignored.

```
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

```

## How does the project work?

#### The project has 5 preset cities which are stored locally when the application starts. They are called from the API on application load.


```
const APIkey = `621f1f003c7991f2765209be469931c2`;
const presetCities = useMemo(() => ['New York', 'London', 'Paris', 'Tokyo', 'Sydney'], []);

...

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


```

#### If you want to search a certain city, you have an input field that stores the value entered and calls the addCustomCity Function

```
<form onSubmit={addCustomCity}>
        <div>
            <label>
             Search for city/county: 
              <input
                type="text"
                className="inputStyle"
                placeholder="Type here"
                value={customCity}
                onChange={(event) => setCustomCity(event.target.value)} // customCity gets the value entered in the input
              />
            </label>
            <button type="submit" className='viewButton'>Search</button>
        </div>
      </form>
```

#### addCustomCity function - It checks weather the input is empty/blank space, then proceeds to call from the API link with the variable stored before as "city" inside the link. If the city is valid it is stored in "dataCities"


```
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
```

#### On each displayed city on this field there are 2 buttons: one to add a city to favorites, and another to remove it from the list (dataCities)


```
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
```

#### Your list of favorites (favoriteLocations) is updated accordingly and stored separately from dataCities. The cities from "favoriteLocations" have a single button that can only remove them from this list, this button uses the same function "removeCity" from before.

```
<div className='padding-bottom-5'>
       {favoriteLocations.length > 0 && (
        <>
      <h1 className='padding-top-3'>Favorites</h1>
        {favoriteLocations.map((location) => (
          <div className="renderBox">
          <button className='removeButton' onClick={() =>
              setFavoriteLocations(favoriteLocations.filter((x) => x !== location))}>
              <img className='smallIcon' src={removeFavorite} alt='removeFavorite'/>
          </button>
          <button className='edit' onClick={() =>
              setFavoriteLocations(favoriteLocations.filter((x) => x !== location))}>
              <img className='smallIcon' src={removeFavorite} alt='removeFavorite'/>
          </button>
          <RenderCity key={location.name} city={location} />
          </div>
        ))}
      </>)}
    </div>
```
