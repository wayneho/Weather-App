import { RECEIVE_POTD } from '../constants/ActionTypes'

export default function photoOfTheDay(state = {}, action){
  switch(action.type){
    case RECEIVE_POTD:
      return{
        ...state,
        ...action.json
      }
    default:
      return state
  }
}