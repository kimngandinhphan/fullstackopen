import axios from 'axios';
import { useState, useEffect } from 'react'

const Country = ({ name, capital, area, languages, flag }) => {
  const [weatherData, setWeatherData] = useState(null)

  useEffect(() => {
    axios
      .get(`http://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)
      .then(res => setWeatherData(res.data))
  }, [capital])

  return <>
    <h1>{name}</h1>
    <p>capital {capital}</p>
    <p>area {area}</p>
    <h4>Languages:</h4>
    <ul>
      {languages.map(language => <li key={language}>{language}</li>)}
    </ul>
    <div><img src={flag} alt='flag' /></div>
    <h2>Weather in {capital}</h2>
    {
      !weatherData ? <p>Loading weather data...</p>
        : <>
          <p>temperature {(weatherData.main.temp - 273.15).toFixed(2)} Celcius</p>
          <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt={`${weatherData.weather[0].description}`} />
          <p>wind {weatherData.wind.speed} m/s</p>
        </>
    }
  </>
}


function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [matches, setMatches] = useState([])
  const [show, setShow] = useState(null)

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        const data = response.data;
        setCountries(data)
      })
  }, [])

  const filterOnChange = (e) => {
    setFilter(e.target.value)
    setMatches(countries.filter(country => country.name.common.toLowerCase().includes(filter)))
    setShow(null)
  }

  const showOnClick = (e) => {
    setShow(matches[e.target.value])
  }

  return <>
    <div>find countries <input value={filter} onChange={filterOnChange} /></div>
    {
      countries.length === 0 ? <p>Loading...</p> : matches.length > 10 ? <p>Too many matches, specify another filter</p>
        : show ? <Country key={show.name.common} name={show.name.common} capital={show.capital[0]} area={show.area} languages={Object.values(show.languages)} flag={show.flags.png} />
          : matches.map((country, index) => <p key={country.name.common}>{country.name.common} <button value={index} onClick={showOnClick}>show</button></p>)
    }
  </>
}

export default App;
