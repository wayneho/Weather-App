import { connect } from 'react-redux'
import { setLocation, getShortForecastIfNeeded, getLongForecastIfNeeded } from '../actions'
import NavigationBar from '../components/NavigationBar'

const mapStateToProps = (state) => {
  return{
    unit: state.selectedUnit,
    selectedLocation: state.selectedLocation,
    locations: state.locations,
    locationsOrder: state.locationsOrder
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: (loc) => {
      dispatch(setLocation(loc))
    }
  }
}

const NavigationBarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationBar)

export default NavigationBarContainer