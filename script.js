"use strict";

//API Key
const API_KEY = "bf16468949c7ae447f31d54988ee67cd";

//Search
const inputEl = document.querySelector(".input");
const searchEl = document.querySelector(".btn");

//Image
const imgEl = document.querySelector(".weather-icon");
const tempEl = document.querySelector("#deg-value");
const cityEl = document.querySelector(".city");

//Details
const humidityEl = document.querySelector(".humid-value");
const windEl = document.querySelector(".wind-value");

//Refactoring
function manupulateDom(temp, cityName, humidity, speed, des) {
  tempEl.textContent = Math.round(temp);
  cityEl.textContent = cityName;
  humidityEl.textContent = humidity;
  windEl.textContent = speed;

  //Image
  if (des == "Clouds") imgEl.src = "images/clouds.png";
  else if (des == "Clear") imgEl.src = "images/clear.png";
  else if (des == "Drizzle") imgEl.src = "images/drizzle.png";
  else if (des == "Mist") imgEl.src = "images/mist.png";
  else if (des == "Rain") imgEl.src = "images/rain.png";
  else if (des == "Snow") imgEl.src = "images/snow.png";
}

//Navigation
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(async function (position) {
    const lon = position.coords.longitude;
    const lat = position.coords.latitude;
    const acc = position.coords.accuracy;
    // console.log(position.coords);
    // console.log(lon, lat, acc);
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    const loc = await res.json();
    // console.log(loc);
    const { name: cityName, main, wind } = loc;
    const { temp, humidity } = main;
    const { speed } = wind;
    const [{ main: des }] = loc.weather;
    // console.log(des);
    tempEl.textContent = Math.round(temp);
    manupulateDom(temp, cityName, humidity, speed, des);
  });
} else {
  console.log("Geolocation is not supported my your browser");
}

searchEl.addEventListener("click", async function () {
  const city = inputEl.value;

  //Fetching data
  document.querySelector(".error").style.display = "none";
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`,
      { method: "GET" }
    );
    // console.log(response);

    if (!response.ok) {
      document.querySelector(".error").style.display = "block";
      document.querySelector(".error").textContent = "Enter a valid city name";

      //Default values
      // console.log(tempEl);
      tempEl.textContent = "--";
      cityEl.textContent = "-";
      humidityEl.textContent = "-";
      windEl.textContent = "-";
      imgEl.src = "images/rain.png";
      console.error("Unable to fetch data");
      return;
    }
    const data = await response.json();
    if (!data) {
      console.error("No data found");
      return;
    }
    // console.log(data);
    const { name: cityName, main, wind } = data;
    const { temp, humidity } = main;
    const { speed } = wind;
    const [{ main: des }] = data.weather;
    // console.log(des);
    //Function call
    manupulateDom(temp, cityName, humidity, speed, des);
    document.querySelector(".weather").style.display = "block";
  } catch (err) {
    if (err.status == 400)
      document.querySelector(".error").style.display = "block";
    console.error("Something went wrong", err);
  }
});
