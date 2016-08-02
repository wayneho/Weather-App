import React, { PropTypes } from 'react'
import { Nav, NavItem } from 'react-bootstrap'
import { convertUnit } from '../utils/ConvertUnit'
import { capitalizeWords } from '../utils/CapitalizeWords'

const NavBar = ({ unit, selectedLocation, locations, locationsOrder, onClick }) => (
  <Nav bsStyle="pills" activeKey={selectedLocation}>
    {
      locationsOrder.map(id => {
        if(!locations[id].isFetching)
          return (
            <NavItem eventKey={id} title={id} key={id} onClick={()=>{onClick(id)}}>
              {`${locations[id].city} - ${convertUnit(locations[id].currentWeather.temp, unit)} °`}
            </NavItem>
          )
      })
    }
  </Nav>
)

NavBar.propTypes = {
  unit: PropTypes.string.isRequired,
  selectedLocation: PropTypes.string.isRequired,
  locations: PropTypes.object.isRequired,
  locationsOrder: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired
}

export default NavBar
