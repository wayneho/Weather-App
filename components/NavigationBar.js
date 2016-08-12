import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Nav, NavItem } from 'react-bootstrap'
import NavigationBarItem from './NavigationBarItem'
import capitalizeWords from '../utils/CapitalizeWords'

const NavigationBar = ({ selectedLocation, locations, locationsOrder }) => (
  <Nav bsStyle="pills" activeKey={selectedLocation}>
    {locationsOrder.map(id => {
      if(!locations[id].isFetching)
        return (
          <NavItem
            eventKey={id}
            title={locations[id].currentWeather.display_location.full} 
            key={id}
            className={"nav-item-wrapper"} >
            <NavigationBarItem id={id} />
          </NavItem> )
    })}
  </Nav>
)

NavigationBar.propTypes = {
  selectedLocation: PropTypes.string.isRequired,
  locations: PropTypes.object.isRequired,
  locationsOrder: PropTypes.array.isRequired
}

const mapStateToProps = (state) => {
  return{
    selectedLocation: state.selectedLocation,
    locations: state.locations,
    locationsOrder: state.locationsOrder
  }
}

export default connect(mapStateToProps)(NavigationBar)


