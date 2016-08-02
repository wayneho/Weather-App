import { connect } from 'react-redux'
import { setUnit } from '../actions'
import ButtonWrapper from '../components/ButtonWrapper'

const mapStateToProps = (state, ownProps) => {
  let style = 'default'
  if(ownProps.unit === state.selectedUnit)
    style = 'success'
  return {
    style
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return{
    onClick: () => {
      dispatch(setUnit(ownProps.unit))
    }
  }
}

const UnitButtonsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ButtonWrapper)

export default UnitButtonsContainer