import { SET_ERROR_MESSAGE, CLEAR_ERROR_MESSAGE } from '../constants/ActionTypes'

export default function errorMessage(state = '', action){
  switch(action.type){
    case SET_ERROR_MESSAGE:
      return action.msg
    case CLEAR_ERROR_MESSAGE:
      return ''
    default:
      return state
  }
}