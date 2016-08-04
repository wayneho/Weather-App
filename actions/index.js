import { fetchCurrentWeather, fetchShortForecast, fetchLongForecast } from '../api/weather'
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
         CLEAR_ERROR_MESSAGE
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

function requestCurrentWeather(lat, lon){
  return{
    type: REQUEST_CURRENT_WEATHER,
    lat,
    lon
  }
}

function receiveCurrentWeather(json){
  return{
    type: RECEIVE_CURRENT_WEATHER,
    id: json.id,
    temp: json.main.temp,
    weather: Object.assign({}, ...json.weather),
    city: json.name,
    country: json.sys.country
  }
}

function receivedAllData(json){
  return{
    type: RECEIVED_ALL_DATA,
    id: json.id,
    isFetching: false
  }
}

// getCurrentWeather checks if the requested location is contained
// in the openweather api database.
// if not found dispatches an error message
// if found it adds the new location to the store
export function getCurrentWeather(lat, lon){
  return (dispatch, getState) => {
    dispatch(requestCurrentWeather(lat, lon))
    return fetchCurrentWeather(lat, lon)
      .then(json => {
        if(json.cod === "404")
          dispatch(setErrorMessage(json.message))
        else{
          const locations = getState().locationsOrder
          const id = json.id.toString()
          if(locations.indexOf(id) === -1){
            // if locations array is empty set the view to the newly added location
            if(locations.length === 0)
              dispatch(setLocation(id))
            Promise.all([
              dispatch(addLocation(id)),
              dispatch(receiveCurrentWeather(json)),
              dispatch(getShortForecast(lat, lon)),
              dispatch(getLongForecast(lat, lon))
              ]).then(() => {
                dispatch(receivedAllData(json))
              })
          }
          else
            dispatch(setErrorMessage('Duplicate City'))
        }
      })
  }
}

function requestForecast(){
  return{
    type: REQUEST_FORECAST,
  }
}

function receiveShortForecast(json){
  return{
    type: RECEIVE_SHORT_FORECAST,
    id: json.city.id,
    shortTerm: json.list.map(data => {
      return {
        time: data.dt_txt,
        temp: data.main.temp,
        weather: Object.assign({},...data.weather)
      }
    })
  }
}

function receiveLongForecast(json){
  return{
    type: RECEIVE_LONG_FORECAST,
    id: json.city.id,
    longTerm: json.list.map(data => {
      return {
        dt: data.dt,
        temp: data.temp.day,
        weather: Object.assign({},...data.weather)
      }
    })
  }
}

export function getShortForecast(lat, lon){
  return dispatch => {
    dispatch(requestForecast())
    return fetchShortForecast(lat, lon)
      .then(json => dispatch(receiveShortForecast(json)))
  }
}

export function getLongForecast(lat, lon){
  return dispatch => {
    dispatch(requestForecast())
    return fetchLongForecast(lat, lon)
      .then(json => dispatch(receiveLongForecast(json)))
  }
}
