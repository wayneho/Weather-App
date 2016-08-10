import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-bootstrap'
import { getAllData, setLocation, addLocation } from '../actions'
import { createCantorPair } from '../utils/createCantorPair'

import Header from '../components/Header'
import NavigationBar from '../components/NavigationBar'
import CurrentWeatherContainer from './CurrentWeatherContainer'
import ShortTermContainer from './ShortTermContainer'
import LongTermContainer from './LongTermContainer'
import PhotoOfTheDay from '../components/PhotoOfTheDay'



class App extends Component {
  constructor(){
    super()
  }

  getInitialLocation(lat, lon, query){
    const { dispatch } = this.props
    const id = createCantorPair(lat, lon)
    dispatch(addLocation(id))
    dispatch(setLocation(id))
    query = query?query:`${lat},${lon}`
    dispatch(getAllData(id, query))
  }

  componentDidMount() {
    // Vancouver, BC coordinates
    const coords = {lat: 49.2827, lon: -123.1207}
    const { dispatch } = this.props
    
    
    if ("geolocation" in navigator) {
      // geolocation is available 
      navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude
        const lon = position.coords.longitude
        this.getInitialLocation(lat, lon)
      })
    } else {
      // geolocation IS NOT available
      this.getInitialLocation(coords.lat, coords.lon, 'vancouver, canada')
    }
  }

  render(){
    if(this.props.isFetching)
      return (
        <div>
          <Header />
          <Grid>
            <h1>Loading...</h1>
          </Grid>
        </div>
      )
    else{
      return(
        <div>
          <Header />
          <Grid>
            {this.props.noLocationSelected
              ?<h1>No city selected.</h1>
              :<div>
                <NavigationBar />
                <Row>
                  <Col xs={12} md={5} >
                    <CurrentWeatherContainer />
                    <div className="referral-container hidden-sm hidden-xs">
                      <div style={{fontWeight: 'bold'}}>Powered by:</div> 
                      <a href="https://www.wunderground.com/?apiref=ae4f9ddfb77d7d6a" target="_blank">
                        <img src="https://icons.wxug.com/logos/PNG/wundergroundLogo_4c_horz.png" />
                      </a>
                    </div>
                  </Col>
                  <Col xs={12} md={7} >
                    <PhotoOfTheDay />
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} >
                    <LongTermContainer />
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} >
                    <div className="referral-container hidden-md hidden-lg">
                      <div style={{fontWeight: 'bold'}}>Powered by:</div> 
                      <a href="https://www.wunderground.com/?apiref=ae4f9ddfb77d7d6a" target="_blank">
                        <img src="https://icons.wxug.com/logos/PNG/wundergroundLogo_4c_horz.png" />
                      </a>
                    </div>
                  </Col>
                </Row>
              </div>
            }
          </Grid>
        </div>
      )
    }
  }
}

// wait for async fetches to complete then render components
function getFetchingState(state){
  if(!state.locations[state.selectedLocation])
    if(state.locationsOrder.length > 0) 
      return true
    else
      return false
  else
    if(state.locations[state.selectedLocation].isFetching)
      return state.locations[state.selectedLocation].isFetching
  return false
}

function mapstateToProps(state) {
  return {
    isFetching: getFetchingState(state),
    noLocationSelected: state.locationsOrder.length===0?true:false
  }
}

export default connect(mapstateToProps)(App)
