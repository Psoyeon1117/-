const API_KEY = "3b9d7f3cdeb15b62e1fd0f73cc6fdbbc"
const feelLikeDisplay = document.querySelector(".feel-like > span");
const windDisplay = document.querySelector(".wind > span");
const weatherDisplay = document.querySelector(".weather > img");
const locationDisplay = document.querySelector(".location");
const temperatureDisplay = document.querySelector(".temperature");
const weatherSelector = document.querySelector("#weather-select");
const info = document.querySelector(".info");

weatherSelector.addEventListener("change", (e) => {
    getWeather(e.target.value)
})
const getWeather = async (city = 'seoul') => {  //에이싱크?
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
    const response = await axios.get(url)
    const {name,main,weather,wind} = response.data; //디스트럭쳐링?
    locationDisplay.innerText = response.data.name;
    temperatureDisplay.innerText = transferTemperauture(response.data.main.temp)
    weatherDisplay.setAttribute('src',`http://openweathermap.org/img/wn/${weather[0].icon}.png`)
    windDisplay.innerText = wind.speed;
    feelLikeDisplay.innerText = transferTemperauture(main.feels_like);
}
const transferTemperauture = (temp) => {
    return (temp - 273.15).toFixed(1);
}
getWeather()
