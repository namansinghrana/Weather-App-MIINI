import React, { useState } from 'react'
import axios from 'axios';
import './WeatherCard.css';
import Image from './images/p1.jpg';

const WeatherCard = () => {
  const [weatherData, setweatherData] = useState(null);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);
  
  const fetchWeatherData = async () => {
    setloading(true);
    seterror(null);

    try{
      const response = await axios.get('http://localhost:8080/weather/temperature');
      setweatherData(response.data);
    }catch(err){
      seterror('Error fetching weather data.');
    } finally {
      setloading(false);
    }
  };

  
  return (
    <>
    <div className='weather-container'>
      <div className='thumbnail' onClick={fetchWeatherData}>
          <img 
          src={Image}
          alt='Weather Thumbnail'
          className='thumbnail-img'
          />
      </div>
      {loading && <p>Loading...</p>}
      {error && <p style={{color:'red'}}>{error}</p>}
      {weatherData && (
        <div className='weather-info'>
          {weatherData.message ? (
            <p>{weatherData.message}</p>
            ) : (
              <>
              <h3>Weather in {weatherData.city}</h3>
              <p>temperature: {weatherData.temperature}°{weatherData.unit}</p>
              </>
            )}
        </div>
      )}
    </div>
    </>
  )
}

export default WeatherCard;