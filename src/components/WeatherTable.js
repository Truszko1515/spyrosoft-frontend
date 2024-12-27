import React from 'react';
import { FaSun, FaCloud, FaCloudRain } from 'react-icons/fa'; // Ikony pogodowe jako przykład
import '../styles/WeatherTable.css';
import weatherCodes from "../utils/weatherCodes";

const WeatherTable = ({ data }) => {
  return (
    <table className="weather-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Weather</th>
          <th>Max Temp</th>
          <th>Min Temp</th>
          <th>Energy (kWh)</th>
        </tr>
      </thead>
      <tbody>
        {data.map((day, index) => (
          <tr key={index}>
            <td>{day.time}</td>
            <td>
              <i className={`fas ${weatherCodes[day.weatherCode]?.icon}`} title={weatherCodes[day.weatherCode]?.description}></i>
              {` ${weatherCodes[day.weatherCode]?.description}`}
            </td>
            <td>{day.temperatureMax}°C</td>
            <td>{day.temperatureMin}°C</td>
            <td>{day.estEneryGenereatedkWh > 0 ? day.estEneryGenereatedkWh + " kWh" : "---"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default WeatherTable;
