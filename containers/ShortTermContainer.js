import { connect } from 'react-redux'
import ShortTermForecast from '../components/ShortTermForecast'

const mapStateToProps = (state) => {
  return{
    unit: state.selectedUnit,
    forecast: state.locations[state.selectedLocation].forecast.shortTerm
  }
}

const ShortTermForecastContainer = connect(
  mapStateToProps
)(ShortTermForecast)

export default ShortTermForecastContainer