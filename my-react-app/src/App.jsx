import React, { useState, useEffect } from 'react';

export default function App() {
  const [city, setCity] = useState('London');
  const [weather, setWeather] = useState(null);
  const [input, setInput] = useState('');

  // Function to fetch weather
  const fetchWeather = (cityName) => {
    fetch(`https://wttr.in/${cityName}?format=j1`)
      .then(res => res.json())
      .then(data => {
        setWeather(data.current_condition[0]);
        setCity(cityName);
      })
      .catch(err => console.error("City not found", err));
  };

  // Load default city on start
  useEffect(() => {
    fetchWeather('London');
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (input) fetchWeather(input);
  };

  return (
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'linear-gradient(to bottom, #68aeeb 0%, #00f2fe 100%)',
      fontFamily: 'Arial, sans-serif',
      color: 'white'
    }}>
      <div style={{ background: 'rgba(255, 255, 255, 0.2)', padding: '30px', borderRadius: '20px', backdropFilter: 'blur(10px)', textAlign: 'center', boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
        <h1>🌍 SkyCast</h1>
        
        <form onSubmit={handleSearch}>
          <input 
            type="text" 
            placeholder="Enter city name..." 
            style={{ padding: '10px', borderRadius: '5px', border: 'none', outline: 'none', width: '200px' }}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" style={{ marginLeft: '10px', padding: '10px', borderRadius: '5px', border: 'none', cursor: 'pointer', background: '#fff', color: '#4facfe', fontWeight: 'bold' }}>
            Search
          </button>
        </form>

        {weather ? (
          <div style={{ marginTop: '20px' }}>
            <h2 style={{ fontSize: '3rem', margin: '10px 0' }}>{weather.temp_C}°C</h2>
            <p style={{ fontSize: '1.5rem', textTransform: 'capitalize' }}>{weather.weatherDesc[0].value}</p>
            <h3 style={{ opacity: 0.8 }}>{city}</h3>
            
            <div style={{ display: 'flex', gap: '20px', marginTop: '20px', justifyContent: 'center' }}>
              <div>
                <p>Humidity</p>
                <strong>{weather.humidity}%</strong>
              </div>
              <div>
                <p>Wind</p>
                <strong>{weather.windspeedKmph} km/h</strong>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading weather...</p>
        )}
      </div>
    </div>
  );
}