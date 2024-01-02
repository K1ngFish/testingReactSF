import React, { useState } from "react";
import "../styles/Weather.css";

function Weather() {
    const [cityName, setCityName] = useState("");
    const [currentWeather, setCurrentWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [showCurrentWeather, setShowCurrentWeather] = useState(false);
    const [showForecast, setShowForecast] = useState(false);
    const apiKey = 'ec9d575baeee0e57b498c19ce94c677f';

    const handleCityChange = (e) => {
        setCityName(e.target.value);
    };

    const getWeather = async () => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;

        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setCurrentWeather(data);
            setShowCurrentWeather(true);
            setShowForecast(false);
        } catch (error) {
            console.error('Error fetching current weather data:', error);
        }
    };

    const getWeatherForecast = async () => {
        const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${apiKey}`;

        try {
            const response = await fetch(urlForecast);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setForecast(data.list);
            setShowForecast(true);
            setShowCurrentWeather(false);
        } catch (error) {
            console.error('Error fetching forecast data:', error);
        }
    };

    const formatDate = (dateString) => {
        const options = { day: "numeric", month: "numeric", year: "numeric" };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const formatTime = (dateString) => {
        const options = { hour: "numeric", minute: "numeric" };
        return new Date(dateString).toLocaleTimeString(undefined, options);
    };

    return (
        <div>
            <h3>Select city</h3>
            <input
                type="text"
                placeholder="Enter city name"
                value={cityName}
                onChange={handleCityChange}
            />
            <button onClick={getWeather}>Get Current Weather</button>
            <button onClick={getWeatherForecast}>Get 5-Day Forecast</button>

            {showCurrentWeather && currentWeather && (
                <div>
                    <h4>Current Weather</h4>
                    <p>
                        Temperature right now: {currentWeather.main.temp}. But it feels
                        like {currentWeather.main.feels_like}.
                    </p>
                </div>
            )}

            {showForecast && forecast && (
                <div>
                    <h4>5-Day Forecast</h4>
                    {forecast.map((forecastItem) => (
                        <div key={forecastItem.dt}>
                            <p>
                                Date and time: {formatDate(forecastItem.dt_txt)}{' '}
                                {formatTime(forecastItem.dt_txt)}
                            </p>
                            <p>
                                Temperature is {forecastItem.main.temp}°C, but feels like{' '}
                                {forecastItem.main.feels_like}°C. {forecastItem.weather[0].main},{' '}
                                {forecastItem.weather[0].description}
                            </p>
                            <hr />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Weather;
