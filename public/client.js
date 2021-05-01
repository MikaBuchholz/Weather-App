const button = document.getElementById("show-button")
const inputField = document.getElementById("input-field")
const grid = document.getElementById("icon")
const key = api_key

const checkbox = document.getElementById("checkbox")
const cityTag = document.getElementById("city-display")
const temperatureTag = document.getElementById("temp")
const feelsLikeTag = document.getElementById("feels")
const maxTempTag = document.getElementById("maxTemp")
const minTempTag = document.getElementById("minTemp")
const cloudTag = document.getElementById("clouds")
const cloudinessTag = document.getElementById("cloudiness")
const windspeedTag = document.getElementById("wind")
const imgTag = document.getElementById("img")

async function makeApiCall(cityName, unit) {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${unit}&APPID=${key}`)
  .then(response => response.json())
  .then(data => {
      return data
  })
  .catch(err => console.log(err))

  return response
}

button.onclick = async function() {
    if (checkbox.checked) {
      var unit = "metric"
      var unitSymbol = "°C"
      var speedUnits = "Km/h"
    } else {
      var unit = "imperial"
      var unitSymbol = "°F"
      var speedUnits = "mph"
    }

    const cityName = inputField.value
    const weatherJson = makeApiCall(cityName, unit)
    const weatherData = await weatherJson
    try {
    const temperatureData = weatherData.main
    const detailedWeatherDescription = weatherData.weather[0]
    const windData = weatherData.wind
   

    const icon = detailedWeatherDescription.icon

    const currentTemperature = temperatureData.temp
    const temperatureFeelsLike = temperatureData.feels_like
    const temperatureMax = temperatureData.temp_max
    const temperatureMin = temperatureData.temp_min

    const cloudsInSky = detailedWeatherDescription.main
    const cloudDescription = detailedWeatherDescription.description

    const windSpeed = windData.speed
  
    cityTag.innerHTML = `Weather for <u>${cityName}</u>`
    temperatureTag.innerText = `Temperature: ${currentTemperature}${unitSymbol}`
    feelsLikeTag.innerText = `Feels like: ${temperatureFeelsLike}${unitSymbol}`
    maxTempTag.innerText = `Max. Temp: ${temperatureMax}${unitSymbol}`
    minTempTag.innerText = `Min. Temp: ${temperatureMin}${unitSymbol}`
    cloudTag.innerText = `Expected: ${cloudsInSky}`
    cloudinessTag.innerText = `Sky: ${cloudDescription}`
    windspeedTag.innerText = `Windspeed: ${windSpeed}${speedUnits}`

    inputField.value = ""
  } catch {
    inputField.value = ""
    return
}
    //img = document.createElement("IMG")
    //img.setAttribute("src", `http://openweathermap.org/img/wn/${icon}@2x.png`)
    //grid.appendChild(img)

    
    
}