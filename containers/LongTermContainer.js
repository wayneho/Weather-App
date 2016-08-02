import { connect } from 'react-redux'
import LongTermForecast from '../components/LongTermForecast'

const mapStateToProps = (state) => {
  return{
    unit: state.selectedUnit,
    forecast: state.locations[state.selectedLocation].forecast.longTerm
  }
}

const LongTermForecastContainer = connect(
  mapStateToProps
)(LongTermForecast)

export default LongTermForecastContainer