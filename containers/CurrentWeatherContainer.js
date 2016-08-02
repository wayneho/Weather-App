import { connect } from 'react-redux'
import CurrentWeather from '../components/CurrentWeather'

const mapStateToProps = (state) => {
  return {
    selectedUnit: state.selectedUnit,
    city: state.locations[state.selectedLocation].city,
    country: state.locations[state.selectedLocation].country,
    currentWeather: state.locations[state.selectedLocation].currentWeather
  }
}

const CurrentWeatherContainer = connect(
  mapStateToProps
)(CurrentWeather)

export default CurrentWeatherContainer