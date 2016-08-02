import { SET_UNIT } from '../constants/ActionTypes'

export default function selectedUnit(state = 'celsius', action){
  switch(action.type){
    case SET_UNIT:
      return action.unit
    default:
      return state
  }
}
