import { combineReducers } from 'redux'

import locations from './locations'
import locationsOrder from './locationsOrder'
import errorMessage from './errorMessage'
import selectedUnit from './selectedUnit'
import selectedLocation from './selectedLocation'
import photoOfTheDay from './photoOfTheDay'

const rootReducer = combineReducers({
  selectedUnit,
  selectedLocation,
  locations,
  locationsOrder,
  errorMessage,
  photoOfTheDay
})

export default rootReducer
