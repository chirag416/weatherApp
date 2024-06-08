import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { Toaster, toast } from 'react-hot-toast';

const api = {
  key: "e22a0bf2b1efebbb128a84f5efa8a0c6",
  base: "https://api.openweathermap.org/data/2.5/",
};

const Places = () => {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState(null);  
  const [dateTime, setDateTime] = useState(null);
  const [dataFetched, setDataFetched] = useState(false);  

  const searchPressed = () => {
    if (search.trim() === '') {
      toast.error('Please enter a city name.');
      return;
    }

    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('City not found');
        }
      })
      .then((result) => {
        setWeather(result);
        console.log(result);
        if (result.dt !== undefined && result.timezone !== undefined) {
          const localTime = new Date((result.dt + result.timezone) * 1000);
          setDateTime(localTime);
        }
        setDataFetched(true);  
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
        setDataFetched(false);
        if (error.message === 'City not found') {
          toast.error('City not found. Please try again.');
        } else {
          toast.error('An error occurred while fetching weather data. Please try again later.');
        }
      });
  };

  const formatDate = (date) => {
    if (!date) return "";
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  const formatTime = (date) => {
    if (!date) return "";
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
    return date.toLocaleTimeString(undefined, options);
  };

  return (
    <div className='main'>
      <div className='heading'>
        <h1>Weather App</h1>
      </div>

      {/* input and search button */}
      <div className='search-section'>
        <input
          type="text"
          placeholder="Enter city"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className='search-button' onClick={searchPressed}>
          <FaSearch className='search-icon' />
        </button>
      </div>

      {/* Conditional rendering of place name and weather data */}
      {dataFetched && weather && (
        <>
          {/* place name */}
          <div className='place-name'>
            <p>{weather.name}</p>
          </div>

          {/* main output */}
          <div className='main-output'>
            {weather.main && <p> {weather.main.temp}°C</p>}
            <br />
            {weather.main && <p>Humidity: {weather.main.humidity}%</p>}
            {weather.wind && <p>Wind Speed: {weather.wind.speed} m/s</p>}
            {weather.weather && weather.weather[0] && (
              <p className="description"> {weather.weather[0].description}</p>
            )}
          </div>

          {/* date and time */}
          <div className='date-time'>
            {dateTime && (
              <div>
                <p>{formatDate(dateTime)}</p>
                <p>{formatTime(dateTime)}</p>
              </div>
            )}
          </div>
        </>
      )}

      <Toaster />
    </div>
  );
};

export default Places;
