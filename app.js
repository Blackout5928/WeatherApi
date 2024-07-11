document.addEventListener("DOMContentLoaded", function() {
    const apiKey = "nloLwJjzNAylDcwwevWMPHisnuOafuCQ"; // Replace with your actual API key
    const form = document.getElementById("cityForm");
    const weatherDiv = document.getElementById("weather");


    form.addEventListener("submit", function(event) {
        event.preventDefault();
        const city = document.getElementById("cityInput").value;
        
        getWeather(city);
    });

    function getWeather(Location_key){
      const url = `http://dataservice.accuweather.com/forecasts/v1/hourly/1hour/${Location_key}?apikey=${apiKey}&locationKey=${Location_key}`;

      fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data && data.length > 0) {
                    const locationKey = data[0].Key;
                    fetchWeatherData(locationKey);
                } else {
                    weatherDiv.innerHTML = `<p>City not found.</p>`;
                }
            })
            .catch(error => {
                console.error("Error fetching location data:", error);
                weatherDiv.innerHTML = `<p>Error fetching location data.</p>`;
            });
    }

    function getWeather(city) {
        const url = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${city}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data && data.length > 0) {
                    const locationKey = data[0].Key;
                    fetchWeatherData(locationKey);
                } else {
                    weatherDiv.innerHTML = `<p>City not found.</p>`;
                }
            })
            .catch(error => {
                console.error("Error fetching location data:", error);
                weatherDiv.innerHTML = `<p>Error fetching location data.</p>`;
            });
    }

    function fetchWeatherData(locationKey) {
        const url = `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apiKey}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data && data.length > 0) {
                    displayWeather(data[0]);
                } else {
                    weatherDiv.innerHTML = `<p>No weather data available.</p>`;
                }
            })
            .catch(error => {
                console.error("Error fetching weather data:", error);
                weatherDiv.innerHTML = `<p>Error fetching weather data.</p>`;
            });
    }

    function displayWeather(data) {
        const temperature = data.Temperature.Metric.Value;
        const weather = data.WeatherText;
        const weathericon = data.WeatherIcon;
        const datetime = data.DateTime;
        const epochdatetime = data.EpochDateTime;
        const weatherContent = `
            <h2>Weather</h2>
            <p>${weathericon}</p>
            <p>Temperature: ${temperature}°C</p>
            <p>Weather: ${weather}</p>
            <p>DateTime: ${datetime}</p>
            <p>EpochDateTime: ${epochdatetime}</p>
        `;
        weatherDiv.innerHTML = weatherContent;
    }
});
