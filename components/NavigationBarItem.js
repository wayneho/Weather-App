import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { NavItem } from 'react-bootstrap'
import { setLocation, removeLocation } from '../actions'
import { convertUnit } from '../utils/ConvertUnit'

class NavigationBarItem extends Component {
  constructor(){
    super()
    this.state = {showDeleteButton: false}
    this.onMouseOver = this.onMouseOver.bind(this)
    this.onMouseOut = this.onMouseOut.bind(this)
    this.onClick = this.onClick.bind(this)
    this.onClickDelete = this.onClickDelete.bind(this)
  }

  onClick(id){
    const { dispatch } = this.props
    dispatch(setLocation(id))
  }

  onMouseOver(){
    this.setState({showDeleteButton: true})
  }

  onMouseOut(){
    this.setState({showDeleteButton: false})
  } 

  onClickDelete(id){
    const { dispatch, selectedLocation, locations } = this.props
    
    // if the current viewed city is being removed
    // set the current weather view to one of the added cities
    if(selectedLocation === id){
      const ind = locations.indexOf(id)
      if(locations[ind+1])
        dispatch(setLocation(locations[ind+1]))
      else if(locations[ind-1])
        dispatch(setLocation(locations[ind-1]))
      else
        dispatch(setLocation(''))
    }
    dispatch(removeLocation(id))
  }

  render(){
    const {id, city, country, temp } = this.props
    return(
      <div 
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut} 
      >
        <div
          className={'nav-item-content'}
          onClick={()=>{this.onClick(id)}}>
          {`${city}, ${country} - ${temp} °`}
        </div>
        <div 
          className={this.state.showDeleteButton?"circle visible":"circle"}
          onClick={()=>{this.onClickDelete(id)}}>
          &#10006;
        </div>
      </div>
    )
  }

}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.id
  return{
    id: id,
    temp: convertUnit(state.locations[id].currentWeather.temp, state.selectedUnit),
    city: state.locations[id].city,
    country: state.locations[id].country,
    selectedLocation: state.selectedLocation,
    locations: state.locationsOrder
  }
}

NavigationBarItem.propTypes = {
  id: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  temp: PropTypes.number.isRequired,
  selectedLocation: PropTypes.string.isRequired,
  locations: PropTypes.array.isRequired
}

export default connect(mapStateToProps)(NavigationBarItem) 