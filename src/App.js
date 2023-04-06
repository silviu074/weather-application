
import axios from 'axios'
import React, { useState, useEffect} from 'react'
import { City } from './Components/City'
import '../src/Style/MainPage.css'



function App() {

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [cityInfo, setCityInfo] = useState()

  // API request

  useEffect( () => {
    axios.get('https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=621f1f003c7991f2765209be469931c2')
      .then(response => {
          setLoading(false)
          setCityInfo(response.data)
          setError(false)
      })
      .catch(err => {
          setLoading(false)
          setCityInfo({})
          setError(true)
          console.log(err)
      })
  }, [])

  console.log(cityInfo)

  

  return (
    <div>
      {loading ? 'Loading' : null}
      {error ? 'Something went wrong' : null}
      <h1>Weather app</h1>
      <City/>
    </div>
  );
}

export default App;
