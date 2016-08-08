import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Form, FormGroup, FormControl, Button } from 'react-bootstrap'
import { getCurrentWeather, setErrorMessage, clearErrorMessage } from '../actions'
import GeoSuggest from 'react-geosuggest'

class AddLocationForm extends Component{
  constructor(){
    super()
    this.state = {isCitySelected: false, city: ''}
    this.onSuggestSelect = this.onSuggestSelect.bind(this)
    this.onFocus = this.onFocus.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.removeErrorMessage = this.removeErrorMessage.bind(this)
  }

  onSuggestSelect(suggest){
    const { dispatch, errorMessage } = this.props
    this.setState({city: suggest, isCitySelected: true})
    
    if(errorMessage.length>0)
      dispatch(clearErrorMessage())
  }
  onFocus(){
    this.setState({isCitySelected: false})
  }

  handleSubmit(e){
    e.preventDefault()
    const { dispatch } = this.props

    if(this.state.isCitySelected === false){
      dispatch(setErrorMessage('Please select a city from the drop down list'))
    }
    else{
      this.setState({isCitySelected: false})
      this.refs.searchCityInput.clear()
      dispatch(getCurrentWeather(this.state.city.location.lat, this.state.city.location.lng))
    }
  }

  removeErrorMessage(){
    const { dispatch } = this.props
    dispatch(clearErrorMessage())
  }

  render(){
    let errorMessage = this.props.errorMessage
    return(
      <Form onSubmit={this.handleSubmit} className="navbar-form">
        <GeoSuggest
          ref="searchCityInput"
          placeholder="City Name"
          onSuggestSelect={this.onSuggestSelect}
          onFocus={this.onFocus}
          types={['(cities)']} 
        />
        {' '}
        <Button type="submit" bsSize="small">Add</Button>
        <div style={{color: 'red'}} onClick={this.removeErrorMessage}>{errorMessage}</div>
      </Form>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    errorMessage: state.errorMessage
  }
}

export default connect(mapStateToProps)(AddLocationForm)
