import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherTable from './components/WeatherTable';
import Footer from './components/Footer';
import './styles/App.css';
///
import MapWithMarker from "./components/MapWithMarker";

const App = () => {
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [formLocation, setFormLocation] = useState({ lat: "", lon: "" });
  const [weatherData, setWeatherData] = useState(null);
  const [weatherSummary, setWeatherSummary] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null); 
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Wczytaj preferencje Dark Mode z localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("dark-mode");
    if (savedTheme === "true") {
      setIsDarkMode(true);
      document.body.classList.add("dark-mode");
    }
  }, []);

  // Obsługa przełączania Dark Mode
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("dark-mode", newMode); // Zapisz wybór do localStorage
    if (newMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  };

  const fetchWeatherData = () => {
    if (
      isNaN(location.lat) || 
      isNaN(location.lon) ||
      parseFloat(location.lat) < -90 || 
      parseFloat(location.lat) > 90 || 
      parseFloat(location.lon) < -180 || 
      parseFloat(location.lon) > 180
    ) {
      setErrorMessage("Please enter valid coordinates (Latitude: -90 to 90, Longitude: -180 to 180).");
      setTimeout(() => setErrorMessage(null), 3000);
      return;
    }
  
    axios
      .get(`https://localhost:7115/WeatherForecast/weekly-forecast?Latitude=${location.lat}&Longitude=${location.lon}`)
      .then((response) => setWeatherData(response.data))
      .catch((error) => handleApiError(error));
  
    axios
      .get(`https://localhost:7115/WeatherForecast/weekly-summary?Latitude=${location.lat}&Longitude=${location.lon}`)
      .then((response) => {
        setWeatherSummary(response.data);
  
        // Smooth scroll to the weather data section
        const weatherSection = document.querySelector(".weather-table");
        if (weatherSection) {
          weatherSection.scrollIntoView({ behavior: "smooth" });
        }
      })
      .catch((error) => handleApiError(error));
  };

  const handleApiError = (error) => {
    if (error.response && error.response.data) {
      const errors = error.response.data.errors;
      const errorMessages = Object.values(errors)
        .flat()
        .join(" "); 
      setErrorMessage(errorMessages);

      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
        setFormLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        })
      },
      (error) => console.error("Error fetching location: "),
      { enableHighAccuracy: true }
    );
  }, []);

  useEffect(() => {
    if (location.lat !== null && location.lon !== null)  {
      fetchWeatherData();
    }
  }, [location]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormLocation((prevLocation) => ({
      ...prevLocation,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Location - ${location.lat} ${location.lon}`);
    console.log(`FormLocation - ${location.lat} ${location.lon}`);
    setLocation({
      lat: parseFloat(formLocation.lat),
      lon: parseFloat(formLocation.lon),
    });
    
  };

  const handleMapLocationChange = (newLocation) => {
    setLocation(newLocation);
    setFormLocation(newLocation); 
  };

  return (
    <div className="app">
      <button onClick={toggleDarkMode} className="toggle-dark-mode">
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>
       <header>
        <h1>Weather Forecast</h1>
      </header>
      <form onSubmit={handleSubmit} className="location-form">
        <label>
          Latitude:
          <input
            type="number"
            name="lat"
            value={formLocation.lat}
            onChange={handleInputChange}
            placeholder="Enter latitude"
            required
          />
        </label>
        <label>
          Longitude:
          <input
            type="number"
            name="lon"
            value={formLocation.lon}
            onChange={handleInputChange}
            placeholder="Enter longitude"
            required
          />
        </label>
        <button type="submit">Get Forecast</button>
      </form>
      {errorMessage && (
        <div className="error-popup">
          <p>{errorMessage}</p>
        </div>
      )}

      {/* Map */}
      <MapWithMarker location={location} setLocation={handleMapLocationChange} />

      {weatherData && weatherSummary ? (
        <>
          <WeatherTable data={weatherData?.data} />
          <h2 className="section-title">Incoming Week Forecast Summary</h2>
          <Footer data={weatherSummary} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default App;
