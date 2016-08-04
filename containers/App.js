import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-bootstrap'
import { getCurrentWeather, setLocation } from '../actions'

import Header from '../components/Header'
import NavigationBar from '../components/NavigationBar'
import CurrentWeatherContainer from './CurrentWeatherContainer'
import ShortTermContainer from './ShortTermContainer'
import LongTermContainer from './LongTermContainer'



class App extends Component {
  constructor(){
    super()
  }

  componentDidMount() {
    // Vancouver, BC coordinates
    const coords = {lat: 49.2827, lon: -123.1207}
    const { dispatch } = this.props
    
    if ("geolocation" in navigator) {
      // geolocation is available 
      navigator.geolocation.getCurrentPosition(position => {
        dispatch(getCurrentWeather(position.coords.latitude, position.coords.longitude))
      })
    } else {
      // geolocation IS NOT available
      dispatch(getCurrentWeather(coords.lat, coords.lon))
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
                  </Col>
                  <Col xs={12} md={7} >
                    <ShortTermContainer />
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} >
                    <LongTermContainer />
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
