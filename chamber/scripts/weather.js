const apiKey = "70b26bdabe0ed729eec1b5b9b2bd89dd";

// Kolwezi, DRC
const lat = -10.7148;
const lon = 25.4667;

const currentURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

const currentTemp = document.querySelector("#current-temp");
const weatherDesc = document.querySelector("#weather-desc");
const forecastContainer = document.querySelector("#forecast");

async function getWeather() {
    try {
        const response = await fetch(currentURL);

        if (!response.ok) {
            throw new Error("Unable to load weather data.");
        }

        const data = await response.json();

        displayCurrentWeather(data);
        getForecast();

    } catch (error) {
        console.error(error);
        currentTemp.textContent = "Weather unavailable.";
    }
}

function displayCurrentWeather(data) {
    currentTemp.textContent = `${Math.round(data.main.temp)}°C`;

    const description =
        data.weather[0].description
            .split(" ")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");

    const icon = data.weather[0].icon;

    weatherDesc.innerHTML = `
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png"
             alt="${description}">
        <span>${description}</span>
    `;
}

async function getForecast() {
    try {
        const response = await fetch(forecastURL);

        if (!response.ok) {
            throw new Error("Forecast unavailable.");
        }

        const data = await response.json();

        forecastContainer.innerHTML = "";

        const forecast = data.list.filter(item =>
            item.dt_txt.includes("12:00:00")
        );

        forecast.slice(0, 3).forEach(day => {

            const card = document.createElement("div");

            const date = new Date(day.dt_txt);

            const weekday = date.toLocaleDateString("en-US", {
                weekday: "long"
            });

            card.innerHTML = `
                <strong>${weekday}</strong><br>
                ${Math.round(day.main.temp)}°C
            `;

            forecastContainer.appendChild(card);

        });

    } catch (error) {
        console.error(error);
    }
}

getWeather();
