import { ADD_LOCATION } from '../constants/ActionTypes'

export default function locationsOrder(state = [], action){
  switch(action.type){
    case ADD_LOCATION:
      return [...state, action.id]
    default:
      return state
  }
}