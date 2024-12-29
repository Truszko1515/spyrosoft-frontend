# Weather Forecast Frontend Application

A web application built with **React**, enabling users to view a 7-day weather forecast based on their current location or specified coordinates. The application retrieves weather data through a backend API.
---

## Features

### Weather Forecast
- Displays a 7-day weather forecast in a user-friendly table.
- The information includes:
  - Date in the `DD/MM/YYYY` format.
  - Weather condition icon.
  - Maximum and minimum temperatures.
  - Estimated solar energy generation (kWh).

### Interactive Map
- Allows users to select a location using the **Leaflet** map.
- Automatically fills in coordinates in the form after clicking on the map.

### Dark Mode
- Allows switching between light and dark themes.
- User preferences are saved in `localStorage`.

### Responsiveness
- The layout adapts to desktops, tablets, and smartphones.

---

## Technologies and Tools

- **React**: State management and user interactions.
- **React-Leaflet**: Integration of an interactive map.
- **FontAwesome**: Weather icons.
- **CSS Media Queries**: Ensuring responsiveness across devices.
- **LocalStorage**: Saving dark mode preferences.

---

## Setup Instructions

### Run Locally
1. Ensure that **Node.js** is installed.
2. Navigate to the frontend project directory:
   ```bash
   cd frontend
   
### Run In Docker Container Requirements


### Running the Application in Docker
1. Requirements:
- **Docker** and **Docker Compose**
2. Build the Docker image and then run the container:
   ```bash
   docker-compose up --build
