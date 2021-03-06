function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
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
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

let iconNew = null;

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      let forecastDescription = forecastDay.weather[0].main;
      if (forecastDescription === "Rain") {
        iconNew = `<i class="bi bi-cloud-rain other-days-icon"></i>`;
      } else if (forecastDescription === "Clouds") {
        iconNew = `<i class="bi bi-cloud other-days-icon"></i>`;
      } else if (forecastDescription === "Thunderstorm") {
        iconNew = `<i class="bi bi-cloud-lightning-rain other-days-icon"></i>`;
      } else if (forecastDescription === "Drizzle") {
        iconNew = `<i class="bi bi-cloud-drizzle other-days-icon"></i>`;
      } else if (forecastDescription === "Clear") {
        iconNew = `<i class="bi bi-sun other-days-icon"></i>`;
      } else if (forecastDescription === "Snow") {
        iconNew = `<i class="bi bi-snow other-days-icon"></i>`;
      }
      forecastHTML =
        forecastHTML +
        `
    <div class="col-2">
      <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
      <div class="weather-forecast-img">${iconNew}</div>
      <div class="weather-forecast-temp">
        <span class="weather-forecast-temp-day">${Math.round(
          forecastDay.temp.max
        )}??</span>
        <span class="weather-forecast-temp-night">${Math.round(
          forecastDay.temp.min
        )}??</span>
      </div>
    </div>
  `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "7f46018ad594d52d09e30844ec7d3712";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemp(response) {
  let cityElement = document.querySelector("#city");
  let tempElement = document.querySelector("#temp");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celsiusTemp = response.data.main.temp;

  cityElement.innerHTML = response.data.name;
  tempElement.innerHTML = Math.round(response.data.main.temp);
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = response.data.wind.speed;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.innerHTML = response.data.weather[0].main;

  if (iconElement.innerHTML === "Rain") {
    iconElement.innerHTML = `<i class="bi bi-cloud-rain other-days-icon"></i>`;
  } else if (iconElement.innerHTML === "Clouds") {
    iconElement.innerHTML = `<i class="bi bi-cloud other-days-icon"></i>`;
  } else if (iconElement.innerHTML === "Thunderstorm") {
    iconElement.innerHTML = `<i class="bi bi-cloud-lightning-rain other-days-icon"></i>`;
  } else if (iconElement.innerHTML === "Drizzle") {
    iconElement.innerHTML = `<i class="bi bi-cloud-drizzle other-days-icon"></i>`;
  } else if (iconElement.innerHTML === "Clear") {
    iconElement.innerHTML = `<i class="bi bi-sun other-days-icon"></i>`;
  } else if (iconElement.innerHTML === "Snow") {
    iconElement.innerHTML = `<i class="bi bi-snow other-days-icon"></i>`;
  }
  getForecast(response.data.coord);
}

function search(city) {
  apiKey = "7f46018ad594d52d09e30844ec7d3712";
  apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemp);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function displayFarenheit(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp");
  celsiusElement.classList.remove("active");
  farenheitElement.classList.add("active");
  let farenheitTemp = (celsiusTemp * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(farenheitTemp);
}

function displayCelsius(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp");
  celsiusElement.classList.add("active");
  farenheitElement.classList.remove("active");
  tempElement.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let farenheitElement = document.querySelector("#farenheit");
farenheitElement.addEventListener("click", displayFarenheit);

let celsiusElement = document.querySelector("#celsius");
celsiusElement.addEventListener("click", displayCelsius);

search("Kyiv");
