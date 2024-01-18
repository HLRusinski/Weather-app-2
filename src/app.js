function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = searchInput.value;
}

let citySearchElement = document.querySelector("#city-search");
citySearchElement.addEventListener("submit", search);
