import { connect } from 'react-redux'
import CurrentWeather from '../components/CurrentWeather'

const mapStateToProps = (state) => {
  return {
    selectedUnit: state.selectedUnit,
    currentWeather: state.locations[state.selectedLocation].currentWeather
  }
}

const CurrentWeatherContainer = connect(
  mapStateToProps
)(CurrentWeather)

export default CurrentWeatherContainer