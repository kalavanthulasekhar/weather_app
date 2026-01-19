const API_KEY = "dd674b5be99c1f9aac6046fa702637ed";

async function getWeather() {
    const city = document.getElementById("city").value;
    const result = document.getElementById("result");

    if (!city) {
        result.innerHTML = "<p>❌ Enter city name</p>";
        return;
    }

    try {
        const weatherRes = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        const weather = await weatherRes.json();

        const lat = weather.coord.lat;
        const lon = weather.coord.lon;

        const aqiRes = await fetch(
            `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
        );
        const aqiData = await aqiRes.json();

        const aqi = aqiData.list[0].main.aqi;

        result.innerHTML = `
            <p>🌡 Temperature: <b>${weather.main.temp} °C</b></p>
            <p>💧 Humidity: <b>${weather.main.humidity}%</b></p>
            <p>🌫 AQI: <b>${getAQIText(aqi)}</b></p>
        `;
    } catch {
        result.innerHTML = "<p>❌ City not found</p>";
    }
}

function getAQIText(aqi) {
    return ["Good", "Fair", "Moderate", "Poor", "Very Poor"][aqi - 1];
}
