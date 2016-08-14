import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Form, FormGroup, FormControl, Button } from 'react-bootstrap'
import { addLocation, getAllData, setErrorMessage, clearErrorMessage, setLocation } from '../actions'
import { fetchListOfCities } from '../api/weather'
import createCantorPair from '../utils/createCantorPair'
import isDuplicateCityId from '../utils/isDuplicateCityId'
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

  loadSuggestions(inputValue){
    this.setState({
      isLoading: true
    })
    const { dispatch } = this.props
    inputValue = inputValue.trim().toLowerCase()

    // fetch suggestions asynchronously
    fetchListOfCities(inputValue)
      .then(json => {
        const value = this.state.value.trim().toLowerCase()
        // return max 8 suggestions
        const suggestions = json.RESULTS.filter(ind => {
          return ind.type === 'city'
        }).slice(0,8)

        if(inputValue === value){
          this.setState({
            isLoading: false,
            suggestions
          })
        }else{
          this.setState({isLoading: false})
        }
      })
      .catch(err => {
        console.log(err)
        this.setState({
          selectedCity: '',
          isLoading: false,
          value:'',
          suggestions: []
        })
        dispatch(setErrorMessage('Error retrieving cities try again.'))
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
      const id = createCantorPair(parseFloat(selectedCity.lat), parseFloat(selectedCity.lon))
      console.log(id)
      if(isDuplicateCityId(locationsList, id)){
        dispatch(setErrorMessage('City already added'))
      }else{
        dispatch(addLocation(id))
        dispatch(getAllData(id, selectedCity.name))
        if(locationsList.length === 0)
          dispatch(setLocation(id))
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
      <Form onSubmit={this.handleSubmit}>
        <Autosuggest suggestions={suggestions}
                     onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
                     onSuggestionSelected={this.onSuggestionSelected}
                     getSuggestionValue={getSuggestionValue}
                     renderSuggestion={renderSuggestion}
                     inputProps={inputProps} />
        {' '}
        <Button type="submit" bsSize="small">Add</Button>
        <p style={{color: 'red', lineHeight: '15px'}} onClick={this.removeErrorMessage}>{errorMessage}</p>
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
