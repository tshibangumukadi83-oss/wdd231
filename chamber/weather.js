const apiKey = "YOUR_API_KEY";
const lat = -10.7148; // Kolwezi
const lon = 25.4667;

const currentURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

async function getWeather() {
    try {
        const response = await fetch(currentURL);
        const data = await response.json();

        document.querySelector("#temperature").textContent =
            `Temperature: ${Math.round(data.main.temp)}°C`;

        document.querySelector("#description").textContent =
            data.weather[0].description;

        getForecast();
    } catch (error) {
        console.error(error);
    }
}

async function getForecast() {
    try {
        const response = await fetch(forecastURL);
        const data = await response.json();

        const forecast = document.querySelector("#forecast");
        forecast.innerHTML = "";

        const days = data.list.filter(item => item.dt_txt.includes("12:00:00"));

        days.slice(0, 3).forEach(day => {
            const p = document.createElement("p");
            const date = new Date(day.dt_txt);

            p.textContent =
                `${date.toLocaleDateString("en-US", { weekday: "short" })}: ${Math.round(day.main.temp)}°C`;

            forecast.appendChild(p);
        });

    } catch (error) {
        console.error(error);
    }
}

getWeather();
