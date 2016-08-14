import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Grid, Row, Col, ButtonGroup, Button } from 'react-bootstrap'
import ReactCSSTransitionReplace from 'react-css-transition-replace'

import { getAllData, setLocation, addLocation, getPOTD } from '../actions'
import createCantorPair from '../utils/createCantorPair'

import Header from '../components/Header'
import NavigationBar from '../components/NavigationBar'
import CurrentWeatherContainer from './CurrentWeatherContainer'
import ShortTermContainer from './ShortTermContainer'
import LongTermContainer from './LongTermContainer'
import PhotoOfTheDay from '../components/PhotoOfTheDay'

const backgroundImageStyle = {
  backgroundImage: 'url(./images/sky.jpg)',
  backgroundSize: 'cover',
  backgroundAttachment: 'fixed',
  backgroundRepeat: 'no-repeat'
}

class App extends Component {
  constructor(){
    super()
    this.state = { selectedForecast: 'longTerm', isBackgroundLoaded: false }
    this.onButtonClick = this.onButtonClick.bind(this)
  }

  getInitialLocation(lat, lon){
    const { dispatch } = this.props
    const id = createCantorPair(lat, lon)
    dispatch(addLocation(id))
    dispatch(setLocation(id))
    const q = `${lat},${lon}`
    dispatch(getAllData(id, q))
  }

  onButtonClick(forecast){
    this.setState({selectedForecast: forecast})
  }

  onBackgroundLoad(){
    this.setState({isBackgroundLoaded: true})
  }

  componentDidMount() {
    const { dispatch } = this.props   
    
    if ("geolocation" in navigator) {
      // geolocation is available 
      navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude
        const lon = position.coords.longitude
        this.getInitialLocation(lat, lon)
      })
    } 
    //get picture of the day
    dispatch(getPOTD())
  }

  render(){
    const { isFetching, noLocationSelected } = this.props
    const { selectedForecast, isBackgroundLoaded } = this.state

    if(isFetching)
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
            {noLocationSelected
              ?<h1>No city selected.</h1>
              :<div>
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
                  <Col xs={12} md={7} className='hidden-sm hidden-xs'>
                    <PhotoOfTheDay />
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} >
                    <div className={'forecast-container'}>
                      <ButtonGroup>
                        <Button onClick={()=>this.onButtonClick('longTerm')}
                                bsStyle={selectedForecast==='longTerm'?'info':'default'}
                                className={"col-xs-6"} >
                          7 Day Forecast
                        </Button>
                        <Button onClick={()=>this.onButtonClick('hourly')}
                                bsStyle={selectedForecast==='hourly'?'info':'default'}
                                className={"col-xs-6"} >
                          Hourly Forecast
                        </Button>
                      </ButtonGroup>
                      <ReactCSSTransitionReplace  transitionName="fade-wait" transitionEnterTimeout={450} transitionLeaveTimeout={150}>
                      {selectedForecast==='longTerm'
                        ?<LongTermContainer key={'longTerm'}/>
                        :<ShortTermContainer key={'shortTerm'}/> }
                      </ReactCSSTransitionReplace>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} className='hidden-md hidden-lg'>
                    <PhotoOfTheDay />
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
