import { RECEIVE_CURRENT_WEATHER, RECEIVE_SHORT_FORECAST, 
         RECEIVE_LONG_FORECAST, ADD_LOCATION,
         REMOVE_LOCATION, RECEIVED_ALL_DATA
       } from '../constants/ActionTypes'

function currentWeather(state = {
    temp: {},
    weather: {}
  }, action){
  switch(action.type){
    case RECEIVE_CURRENT_WEATHER:
      return {
        ...state,
        temp: action.temp,
        weather: action.weather
      }
    default:
      return state
  }
}

function forecast(state = {
    shortTerm: [],
    longTerm: []
  }, action){
  switch(action.type){
    case RECEIVE_SHORT_FORECAST:
      return{
        ...state,
        shortTerm: action.shortTerm
      }
    case RECEIVE_LONG_FORECAST:
      return{
        ...state,
        longTerm: action.longTerm
      }
    default:
      return state
  }
}

export default function locations(state = {}, action){
  switch(action.type){
    case ADD_LOCATION:
      return{
        ...state,
        [action.id]: {
          isFetching: true
        }
      }
    case REMOVE_LOCATION:
      let nextState = Object.assign({}, state)
      delete nextState[action.id]
      return nextState
    case RECEIVE_CURRENT_WEATHER:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          city: action.city,
          country: action.country,
          currentWeather: currentWeather(state[action.id].currentWeather, action)
        }
      }
    case RECEIVE_SHORT_FORECAST:
    case RECEIVE_LONG_FORECAST:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          forecast: forecast(state[action.id].forecast, action)
        }
      }
    case RECEIVED_ALL_DATA:{
      return{
        ...state,
        [action.id]:{
          ...state[action.id],
          isFetching: action.isFetching
        }
      }
    }
    default:
      return state
  }
}