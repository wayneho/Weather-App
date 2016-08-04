import { ADD_LOCATION, REMOVE_LOCATION } from '../constants/ActionTypes'

export default function locationsOrder(state = [], action){
  switch(action.type){
    case ADD_LOCATION:
      return [...state, action.id]
    case REMOVE_LOCATION:
      return state.filter(id => {
        return id !== action.id
      })
    default:
      return state
  }
}