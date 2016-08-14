import React from 'react'
import UnitButtonsContainer from '../containers/UnitButtonsContainer'
import { Navbar, Nav, NavItem, Button, ButtonGroup, FormGroup, FormControl} from 'react-bootstrap'
import AddLocationForm from './AddLocationForm'
import NavigationBar from './NavigationBar'

const Header = () => (
  <Navbar className={'navbar-fixed-top'}>
  <div className={'header'}>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="#">Wayne's Weather App</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav pullRight>
        <AddLocationForm />
      </Nav>
      <Nav pullRight>
        <ButtonGroup bsSize="small" className="navbar-btn">
          <UnitButtonsContainer unit="celsius">Celsius</UnitButtonsContainer>
          <UnitButtonsContainer unit="fahrenheit">Fahrenheit</UnitButtonsContainer>          
        </ButtonGroup>
      </Nav>
      <NavigationBar />
    </Navbar.Collapse>
    </div>
  </Navbar>
)

export default Header