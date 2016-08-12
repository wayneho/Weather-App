require('es6-promise').polyfill()
require('isomorphic-fetch')
import fetchJsonp from 'fetch-jsonp'

const appid = '28b73c0cb0782e8fc676faa500c47734'
const key = 'ad517eccccdeddd4'

export function fetchCurrentWeather(query){
  return fetch(`https://api.wunderground.com/api/${key}/conditions/q/${query}.json`)
    .then(res => {
      if(res.status >= 400)
        console.log("Error retrieving current weather")
      return res.json()
    })
}

export function fetchShortForecast(query){
  return fetch(`https://api.wunderground.com/api/${key}/hourly/q/${query}.json`)
    .then(res => {
      if(res.status >= 400)
        console.log("Error retrieving short term forecast")
      return res.json()
    })
}

export function fetchLongForecast(query){
  return fetch(`https://api.wunderground.com/api/${key}/forecast10day/q/${query}.json`)
    .then(res => {
      if(res.status >= 400)
        console.log("Error retrieving long term forecast")
      return res.json()
    })
}

export function fetchListOfCities(query){
   return fetchJsonp(`https://autocomplete.wunderground.com/aq?query=${query}`, {jsonpCallback: 'cb'})
    .then(res => {
      if(res.status >= 400)
        console.log("Error retrieving list of cities")
      return res.json()
    })
}

export function fetchPOTD(){
  return fetch('https://api.nasa.gov/planetary/apod?api_key=cmZiEwrhdUIKKzic9Bt8eVD3rHJ4kYRVjqoUWSWW')
    .then(res => {
      if(res.status >= 400)
        console.log("Error retrieving photo of the day")
      return res.json()
    })
}