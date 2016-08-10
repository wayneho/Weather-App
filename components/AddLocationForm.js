import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Form, FormGroup, FormControl, Button } from 'react-bootstrap'
import { addLocation, getAllData, setErrorMessage, clearErrorMessage } from '../actions'
import { fetchListOfCities } from '../api/weather'
import { createCantorPair } from '../utils/createCantorPair'
import { isDuplicateCityId } from '../utils/isDuplicateCityId'
import Autosuggest from 'react-autosuggest'

function getSuggestionValue(suggestion){
  return suggestion.name
}

function renderSuggestion(suggestion){
  return (
    <span>{suggestion.name}</span>
  )
}

class AddLocationForm extends Component{
  constructor(){
    super()
    this.state = { selectedCity: '',
                   isLoading: false,
                   value:'',
                   suggestions: [] }
    this.onChange = this.onChange.bind(this)
    this.onSuggestionsUpdateRequested = this.onSuggestionsUpdateRequested.bind(this)
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.removeErrorMessage = this.removeErrorMessage.bind(this)
  }

  loadSuggestions(value){
    this.setState({
      isLoading: true
    })

    const inputValue = value.trim().toLowerCase()

    fetchListOfCities(inputValue)
      .then(json => {
        const suggestions = json.RESULTS.filter(ind => {
          return ind.type === 'city'
        }).slice(0,8)
        if(inputValue === this.state.value){
          this.setState({
            isLoading: false,
            suggestions
          })
        }else{ // Ignore suggestions if input value changed
          this.setState({isLoading: false})
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  onChange(e, { newValue }){
    this.setState({value: newValue, selectedCity: ''})
  }

  onSuggestionsUpdateRequested({ value }){
    this.loadSuggestions(value)
  }

  onSuggestionSelected(event, {suggestion}){
    const { dispatch, errorMessage } = this.props
    this.setState({selectedCity: suggestion})

    if(errorMessage.length>0)
      dispatch(clearErrorMessage())
  } 

  onFocus(){
    this.setState({selectedCity: ''})
  }

  // Force users to select a city from the drop down list
  // Check for duplicate city
  handleSubmit(e){
    e.preventDefault()
    const { dispatch, locationsList } = this.props
    const { selectedCity } = this.state

    if(selectedCity.length===0){
      dispatch(setErrorMessage('Please select a city from the drop down list'))
    }
    else{
      console.log(selectedCity)
      const id = createCantorPair(parseInt(selectedCity.lat,10), parseInt(selectedCity.lon,10))
      console.log(id)
      if(isDuplicateCityId(locationsList, id)){
        dispatch(setErrorMessage('City already added'))
      }else{
        dispatch(addLocation(id))
        dispatch(getAllData(id, selectedCity.name))
        this.setState({selectedCity: '', value: ''})
      }
    }
  }

  removeErrorMessage(){
    const { dispatch } = this.props
    dispatch(clearErrorMessage())
  }

  render(){
    const { value, suggestions, isLoading } = this.state
    const inputProps = {
      placeholder: 'Enter a city',
      value,
      onChange: this.onChange
    }
    let errorMessage = this.props.errorMessage
    return(
      <Form onSubmit={this.handleSubmit} className="navbar-form">
        <Autosuggest suggestions={suggestions}
                     onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
                     onSuggestionSelected={this.onSuggestionSelected}
                     getSuggestionValue={getSuggestionValue}
                     renderSuggestion={renderSuggestion}
                     inputProps={inputProps} />
        {' '}
        <Button type="submit" bsSize="small">Add</Button>
        <div style={{color: 'red', marginTop: '5px'}} onClick={this.removeErrorMessage}>{errorMessage}</div>
      </Form>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    errorMessage: state.errorMessage,
    locationsList: state.locationsOrder
  }
}

export default connect(mapStateToProps)(AddLocationForm)
