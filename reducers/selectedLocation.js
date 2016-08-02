import { SET_LOCATION } from '../constants/ActionTypes'

export default function selectedLocation(state = '', action){
  switch(action.type){
    case SET_LOCATION:
      return action.location
    default: 
      return state
  }
}