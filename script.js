"use strict";

//API Key
const API_KEY = "bf16468949c7ae447f31d54988ee67cd";

//Search
const inputEl = document.querySelector(".input");
const searchEl = document.querySelector(".btn");

//Image
const imgEl = document.querySelector(".weather-icon");
const tempEl = document.querySelector("#deg");
const cityEl = document.querySelector(".city");

//Details
const humidityEl = document.querySelector(".humid");
const windEl = document.querySelector(".wind");

searchEl.addEventListener("click", async function () {
  const city = inputEl.value;

  //Fetching data
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`,
      { method: "GET" }
    );
    if (response.status == 404)
      document.querySelector(".error").style.display = "block";
    if (!response.ok) {
      document.querySelector(".error").style.display = "block";
      document.querySelector(".error").textContent = "Enter a valid city name";
      console.error("Unable to fetch data");
      return;
    }
    const data = await response.json();
    if (!data) {
      console.error("No data found");
      return;
    }
    console.log(data);
    const { name: cityName, main, wind } = data;
    const { temp, humidity } = main;
    const { speed } = wind;
    const [{ main: des }] = data.weather;
    console.log(des);

    tempEl.textContent = Math.round(temp) + "°C";
    cityEl.textContent = cityName;
    humidityEl.textContent = humidity + "%";
    windEl.textContent = speed + " Km/h";

    //Image
    if (des == "Clouds") imgEl.src = "images/clouds.png";
    else if (des == "Clear") imgEl.src = "images/clear.png";
    else if (des == "Drizzle") imgEl.src = "images/drizzle.png";
    else if (des == "Mist") imgEl.src = "images/mist.png";
    else if (des == "Rain") imgEl.src = "images/rain.png";
    else if (des == "Snow") imgEl.src = "images/snow.png";

    document.querySelector(".weather").style.display = "block";
  } catch (err) {
    console.error("Something went wrong", err);
  }
});
