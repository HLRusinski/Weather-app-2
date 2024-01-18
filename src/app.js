function updateWeather(response) {
  let tempElement = document.querySelector("#current-temp");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");

  cityElement.innerHTML = response.data.city;
  tempElement.innerHTML = Math.round(temperature);
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

let citySearchElement = document.querySelector("#city-search");
citySearchElement.addEventListener("submit", search);

pullTemp("London");
