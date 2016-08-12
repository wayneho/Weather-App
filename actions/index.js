import { fetchCurrentWeather, fetchShortForecast, fetchLongForecast, fetchPOTD } from '../api/weather'
import { ADD_LOCATION,
         REMOVE_LOCATION,
         SET_UNIT,
         SET_LOCATION,
         REQUEST_CURRENT_WEATHER,
         RECEIVE_CURRENT_WEATHER,
         REQUEST_FORECAST,
         RECEIVE_LONG_FORECAST,
         RECEIVE_SHORT_FORECAST,
         CITY_NOT_FOUND,
         RECEIVED_ALL_DATA,
         SET_ERROR_MESSAGE,
         CLEAR_ERROR_MESSAGE,
         RECEIVE_POTD
        } from '../constants/ActionTypes'

export function setUnit(unit) {
  return{
    type: SET_UNIT,
    unit
  }
}

export function setLocation(location) {
  return{
    type: SET_LOCATION,
    location
  }
}

export function addLocation(id){
  return {
    type: ADD_LOCATION,
    id
  }
}

export function removeLocation(id){
  return{
    type: REMOVE_LOCATION,
    id
  }
}

export function setErrorMessage(msg){
  return{
    type: SET_ERROR_MESSAGE,
    msg
  }
}

export function clearErrorMessage(){
  return{
    type: CLEAR_ERROR_MESSAGE
  }
}

function requestCurrentWeather(query){
  return{
    type: REQUEST_CURRENT_WEATHER,
    query
  }
}

function receiveCurrentWeather(id, json){
  return{
    type: RECEIVE_CURRENT_WEATHER,
    id,
    data: json.current_observation
  }
}


function getCurrentWeather(id, query){
  return dispatch => {
    dispatch(requestCurrentWeather(query))
    return fetchCurrentWeather(query)
      .then(json => dispatch(receiveCurrentWeather(id, json)))
  } 
}

function receivedAllData(id){
  return{
    type: RECEIVED_ALL_DATA,
    id,
    isFetching: false
  }
}

export function getAllData(id, query){
  return dispatch => {
    Promise.all([
      dispatch(getCurrentWeather(id, query)),
      dispatch(getShortForecast(id, query)),
      dispatch(getLongForecast(id, query))
      ]).then(() => dispatch(receivedAllData(id)))
  }
}

function requestForecast(term, query){
  return{
    type: REQUEST_FORECAST,
    term,
    query 
  }
}

// receive 12 hour forecast
function receiveShortForecast(id, json){
  return{
    type: RECEIVE_SHORT_FORECAST,
    id,
    shortTerm: json.hourly_forecast.splice(0,12)
  }
}

// receive 7 day forecast
function receiveLongForecast(id, json){
  return{
    type: RECEIVE_LONG_FORECAST,
    id,
    longTerm: json.forecast.simpleforecast.forecastday.splice(0,7)
  }
}

function getShortForecast(id, query){
  return dispatch => {
    dispatch(requestForecast("short term", query))
    return fetchShortForecast(query)
      .then(json => dispatch(receiveShortForecast(id,json)))
  }
}

function getLongForecast(id, query){
  return dispatch => {
    dispatch(requestForecast("long term", query))
    return fetchLongForecast(query)
      .then(json => dispatch(receiveLongForecast(id,json)))
  }
}

function receivePOTD(json){
  return {
    type: RECEIVE_POTD,
    json
  }
}

// get photo of the day
export function getPOTD(){
  return dispatch => {
    return fetchPOTD()
      .then(json => dispatch(receivePOTD(json)))
  }
}
