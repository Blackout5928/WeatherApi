document.addEventListener("DOMContentLoaded", function() {
    const apiKey = "IXKMuxMnQlsDlDXllwDs3ar9XJmwz9dy"; // Replace with your actual API key
    const form = document.getElementById("cityForm");
    const weatherDiv = document.getElementById("weather");
    const weatherhourly = document.getElementById("weatherhourly");
    const weatherdays = document.getElementById("days");

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        const city = document.getElementById("cityInput").value;
        getWeather(city);
    });

    function getWeather(city) {
        const url = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${city}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data && data.length > 0) {
                    const locationKey = data[0].Key;
                    fetchHourlyWeather(locationKey);
                    fetchHourlysWeather(locationKey);
                    fetchdays(locationKey);
                } else {
                    weatherDiv.innerHTML = `<p>City not found.</p>`;
                }
            })
            .catch(error => {
                console.error("Error fetching location data:", error);
                weatherDiv.innerHTML = `<p>Error fetching location data.</p>`;
            });
    }

    function fetchHourlysWeather(locationKey) {
        const url = `http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${locationKey}?apikey=${apiKey}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data && data.length > 0) {
                    displayWeathers(data);
                } else {
                    weatherDiv.innerHTML += `<p>No 12-hour weather data available.</p>`;
                }
            })
            .catch(error => {
                console.error("Error fetching weather data:", error);
                weatherDiv.innerHTML += `<p>Error fetching 12-hour weather data.</p>`;
            });
    }

    function fetchHourlyWeather(locationKey) {
        const url = `http://dataservice.accuweather.com/forecasts/v1/hourly/1hour/${locationKey}?apikey=${apiKey}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data && data.length > 0) {
                    displayWeather(data);
                } else {
                    weatherhourly.innerHTML += `<p>No 1-hour weather data available.</p>`;
                }
            })
            .catch(error => {
                console.error("Error fetching weather data:", error);
                weatherhourly.innerHTML += `<p>Error fetching 1-hour weather data.</p>`;
            });
    }

    function fetchdays(locationKey) {
        const url = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${apiKey}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data && data.DailyForecasts && data.DailyForecasts.length > 0) {
                    displayWeatherday(data.DailyForecasts);
                } else {
                    weatherdays.innerHTML += `<p>No 5-day weather data available.</p>`;
                }
            })
            .catch(error => {
                console.error("Error fetching weather data:", error);
                weatherdays.innerHTML += `<p>Error fetching 5-day weather data.</p>`;
            });
    }

    function displayWeather(data) {
        let weatherContent = "<h2>1-Hour Forecast</h2>";
        data.forEach(hourlyData => {
            const temperature = hourlyData.Temperature.Value;
            const weather = hourlyData.IconPhrase;
            const weatherIcon = hourlyData.WeatherIcon;
            const iconUrl = `https://developer.accuweather.com/sites/default/files/${String(weatherIcon).padStart(2, '0')}-s.png`;
            const dateTime = hourlyData.DateTime;
            const daylight = hourlyData.IsDaylight;
            weatherContent += `
                <div class="hourly-weather">
                    <img src="${iconUrl}" alt="Weather Icon" class="iconn">
                    <p>Temperature: ${temperature}°C</p>
                    <p>Weather: ${weather}</p>
                    <p>DateTime: ${dateTime}</p>
                    <p>IsDaylight: ${daylight}</p>
                </div>
            `;
        });
        weatherhourly.innerHTML += weatherContent;
    }

    function displayWeathers(data) {
        let weatherContent = "<h2>12-Hour Forecast</h2>";
        data.forEach(hourlyData => {
            const temperature = hourlyData.Temperature.Value;
            const weather = hourlyData.IconPhrase;
            const weatherIcon = hourlyData.WeatherIcon;
            const iconUrl = `https://developer.accuweather.com/sites/default/files/${String(weatherIcon).padStart(2, '0')}-s.png`;
            const dateTime = hourlyData.DateTime;
            const daylight = hourlyData.IsDaylight;
            weatherContent += `
                <div class="hourly-weather">
                    <img src="${iconUrl}" alt="Weather Icon" class="iconn">
                    <p>Temperature: ${temperature}°C</p>
                    <p>Weather: ${weather}</p>
                    <p>DateTime: ${dateTime}</p>
                    <p>IsDaylight: ${daylight}</p>
                </div>
            `;
        });
        weatherDiv.innerHTML += weatherContent;
    }

    function displayWeatherday(data) {
        let weatherContent = "<h2>5-Day Forecast</h2>";
        data.forEach(dailyData => {
            const temperature = dailyData.Temperature.Maximum.Value;
            const weather = dailyData.Day.IconPhrase;
            const weatherIcon = dailyData.Day.Icon;
            const iconUrl = `https://developer.accuweather.com/sites/default/files/${String(weatherIcon).padStart(2, '0')}-s.png`;
            const date = dailyData.Date;
            weatherContent += `
                <div class="daily-weather">
                    <img src="${iconUrl}" alt="Weather Icon" class="iconn">
                    <p>Temperature: ${temperature}°C</p>
                    <p>Weather: ${weather}</p>
                    <p>Date: ${date}</p>
                </div>
            `;
        });
        weatherdays.innerHTML += weatherContent;
    }
});
