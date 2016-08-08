import React from 'react'
import UnitButtonsContainer from '../containers/UnitButtonsContainer'
import { Navbar, Nav, NavItem, Button, ButtonGroup, FormGroup, FormControl} from 'react-bootstrap'
import AddLocationForm from './AddLocationForm'

const Header = () => (
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="#">Wayne's Weather App</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Navbar.Form pullRight>
        <AddLocationForm />
      </Navbar.Form>
      <Navbar.Form pullRight>
        <ButtonGroup bsSize="small" className="navbar-btn">
          <UnitButtonsContainer unit="celsius">Celsius</UnitButtonsContainer>
          <UnitButtonsContainer unit="farenheit">Farenheit</UnitButtonsContainer>          
        </ButtonGroup>
      </Navbar.Form>
    </Navbar.Collapse>
  </Navbar>
)

export default Header