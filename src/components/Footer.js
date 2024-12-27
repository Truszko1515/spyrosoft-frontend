import React from 'react';
import '../styles/Footer.css';
import weatherCodes from "../utils/weatherCodes";

const Footer = ({ data }) => {

  return (
    <footer className="weather-footer">
      <p>Average Pressure Surface: {data.avgPressureSurface.toFixed(2)} hPa</p>
      <p>Average Pressure Sea Level: {data.avgPressureSeaLevel.toFixed(2)} hPa</p>
      <p>Min Expected Temperature: {data.minExpectedTemperature}°C</p>
      <p>Max Expected Temperature: {data.maxExpectedTemperature}°C</p>
      <p>Average Sun Minutes: {Math.round(data.avgSunshineDuration / 60)} Minutes</p>
      <p>Overall Weather Prediction:  <i className={`fas ${weatherCodes[data.avgWeatherCode]?.icon}`} title={weatherCodes[data.avgWeatherCode]?.description}></i>
              {` ${weatherCodes[data.avgWeatherCode]?.description}`} </p>
    </footer>
  );
};

export default Footer;
