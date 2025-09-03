const apiKey = "525dcfda770a220200b713b8fe1c911a";

// ========== WEATHER FETCH ==========
async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) {
    alert("Please enter a city name");
    return;
  }
  fetchWeatherData(city);
}

function getLocationWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
        const response = await fetch(url);
        const data = await response.json();
        displayWeather(data);
        getForecast(data.coord.lat, data.coord.lon);
      },
      () => {
        alert("Location access denied!");
      }
    );
  } else {
    alert("Geolocation not supported by this browser");
  }
}

async function fetchWeatherData(city) {
  try {
    // if no country is provided, append ,IN (India)
    if (!city.includes(",")) {
      city = city + ",IN";
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) throw new Error(data.message || "City not found");

    displayWeather(data);
    getForecast(data.coord.lat, data.coord.lon);
  } catch (error) {
    alert(error.message);
  }
}

function displayWeather(data) {
  document.getElementById("cityName").innerText = `${data.name}, ${data.sys.country}`;
  document.getElementById("temperature").innerText = `🌡 Temperature: ${data.main.temp} °C`;
  document.getElementById("description").innerText = `☁ Condition: ${data.weather[0].description}`;
  document.getElementById("humidity").innerText = `💧 Humidity: ${data.main.humidity}%`;
  document.getElementById("wind").innerText = `💨 Wind Speed: ${data.wind.speed} m/s`;

  const iconCode = data.weather[0].icon;
  document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  document.getElementById("weatherResult").classList.remove("hidden");
}

async function getForecast(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  const response = await fetch(url);
  const data = await response.json();

  const forecastContainer = document.getElementById("forecastContainer");
  forecastContainer.innerHTML = "";

  const dailyData = data.list.filter(item => item.dt_txt.includes("12:00:00"));

  dailyData.forEach(day => {
    const date = new Date(day.dt_txt).toLocaleDateString("en-US", { weekday: "short" });
    const icon = day.weather[0].icon;
    const temp = day.main.temp.toFixed(1);

    const div = document.createElement("div");
    div.classList.add("forecast-day");
    div.innerHTML = `
      <h4>${date}</h4>
      <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="icon">
      <p>${temp}°C</p>
    `;
    forecastContainer.appendChild(div);
  });

  document.getElementById("forecast").classList.remove("hidden");
}

// ========== THEME TOGGLE ==========
const toggleBtn = document.getElementById("themeToggle");

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  // Change icon
  if (document.body.classList.contains("dark")) {
    toggleBtn.textContent = "☀️";
  } else {
    toggleBtn.textContent = "🌙";
  }
});

