function updateWeather(response) {
  let tempElement = document.querySelector("#current-temp");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#weather-img");

  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class= "weather-img" />`;
  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}mph`;
  tempElement.innerHTML = Math.round(temperature);

  getForecast(response.data.city);
}
function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function pullTemp(city) {
  let apiKey = "b0ct14bcbb3obb233faba3e22b01a08b";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}
function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input");
  pullTemp(searchInput.value);
}

function setDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "b0ct14bcbb3obb233faba3e22b01a08b";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

function showForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 6) {
      forecastHtml =
        forecastHtml +
        `<div class="daily-temp">
          <div class="forecast-date">${setDay(day.time)}</div>
          <img src="${day.condition.icon_url}"class="forecast-icon""/>
          <div class="forecast-temp">
              <span class="max-temp">
              <strong>${Math.round(day.temperature.maximum)}°</strong>
              </span>
              <span class="min-temp">${Math.round(
                day.temperature.minimum
              )}°</span>
           </div>
        </div>
        `;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let citySearchElement = document.querySelector("#city-search");
citySearchElement.addEventListener("submit", search);

pullTemp("London");
