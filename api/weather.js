require('es6-promise').polyfill()
require('isomorphic-fetch')

const appid = '28b73c0cb0782e8fc676faa500c47734'

export function fetchCurrentWeather(lat, lon){
  return fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appid}`)
    .then(res => {
      if(res.status >= 400)
        console.log("Error retrieving current weather")
      return res.json()
    })
}

export function fetchShortForecast(lat, lon){
  return fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=8&appid=${appid}`)
    .then(res => {
      if(res.status >= 400)
        console.log("Error retrieving short term forecast")
      return res.json()
    })
}

export function fetchLongForecast(lat, lon){
  return fetch(`http://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=7&appid=${appid}`)
    .then(res => {
      if(res.status >= 400)
        console.log("Error retrieving long term forecast")
      return res.json()
    })
}