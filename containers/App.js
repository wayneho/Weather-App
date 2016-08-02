import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-bootstrap'
import { getCurrentWeather, setLocation } from '../actions'

import Header from '../components/Header'
import NavigationBarContainer from './NavigationBarContainer'
import CurrentWeatherContainer from './CurrentWeatherContainer'
import ShortTermContainer from './ShortTermContainer'
import LongTermContainer from './LongTermContainer'



class App extends Component {
  constructor(){
    super()
  }

  componentDidMount() {
    const coords = {lat: 49.2827, lon: -123.1207}
    const { dispatch } = this.props
    dispatch(getCurrentWeather(coords.lat, coords.lon))
  }

  render(){
    return(
      <div>
        <Header />
        <Grid>
          {this.props.isFetching
            ?<h1>Loading...</h1>
            :<div>
              <NavigationBarContainer />
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

// wait for async fetches to complete then render components
function getFetchingState(state){
    if(!state.locations[state.selectedLocation]) 
      return true
    else
      if(state.locations[state.selectedLocation].isFetching)
        return state.locations[state.selectedLocation].isFetching
    return false
  }

function mapstateToProps(state) {
  return {
    isFetching: getFetchingState(state) 
  }
}

export default connect(mapstateToProps)(App)
