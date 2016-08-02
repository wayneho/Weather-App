import { combineReducers } from 'redux'

import locations from './locations'
import locationsOrder from './locationsOrder'
import errorMessage from './errorMessage'
import selectedUnit from './selectedUnit'
import selectedLocation from './selectedLocation'

const rootReducer = combineReducers({
  selectedUnit,
  selectedLocation,
  locations,
  locationsOrder,
  errorMessage
})

export default rootReducer
