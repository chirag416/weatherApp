import React, { useState } from 'react';

const api = {
  key: "e22a0bf2b1efebbb128a84f5efa8a0c6",
  base: "https://api.openweathermap.org/data/2.5/",
};

const App = () => {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});
  const [dateTime, setDateTime] = useState(null);

  const searchPressed = () => {
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
        console.log(result);
        if (result.timezone !== undefined) {
          const localTime = new Date((result.dt + result.timezone) * 1000);
          setDateTime(localTime);
        }
      })
      .catch((error) => console.error('Error fetching weather data:', error));
  };

  const formatDate = (date) => {
    if (!date) return "";
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  const formatTime = (date) => {
    if (!date) return "";
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = (hours % 12 || 12).toString().padStart(2, '0');
    return `${formattedHours}:${minutes} ${ampm}`;
  };

  return (
    <div>
      <h1>Weather App</h1>

      <input
        type="text"
        placeholder="Enter city"
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={searchPressed}>Search</button>

      <p>{weather.name}</p>
      {weather.main && <p>Temperature: {weather.main.temp}°C</p>}
      {weather.main && <p>Humidity: {weather.main.humidity}%</p>}
      {weather.weather && weather.weather[0] && <p>Description: {weather.weather[0].description}</p>}
      {weather.wind && <p>Wind Speed: {weather.wind.speed} m/s</p>}

      {dateTime && (
        <>
          <p>Date: {formatDate(dateTime)}</p>
          <p>Time: {formatTime(dateTime)}</p>
        </>
      )}
    </div>
  );
};

export default App;
