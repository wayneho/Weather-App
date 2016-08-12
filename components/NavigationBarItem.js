import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { NavItem } from 'react-bootstrap'
import { setLocation, removeLocation } from '../actions'

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
    // set the current weather view to one of the other cities
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
        onMouseOut={this.onMouseOut} >
        <div
          className={'nav-item-content'}
          onClick={()=>{this.onClick(id)}}>
          {`${city}, ${country} - ${Math.round(temp)}°`}
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
  const { temp_f, temp_c } = state.locations[id].currentWeather
  return{
    id: id,
    temp: state.selectedUnit==='celsius'?temp_c:temp_f,
    city: state.locations[id].currentWeather.display_location.city,
    country: state.locations[id].currentWeather.display_location.country,
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