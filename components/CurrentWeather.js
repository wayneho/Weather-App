import React, { PropTypes } from 'react'
import { convertUnit } from '../utils/ConvertUnit'
import { capitalizeWords } from '../utils/CapitalizeWords'
import { extractDate } from '../utils/ExtractDate'

const CurrentWeather = ({ selectedUnit, city, country, currentWeather }) => {
  const temp = convertUnit(currentWeather.temp, selectedUnit)
  const { main, description, icon } = currentWeather.weather
  const d = new Date()
  const date = extractDate(d.getTime()/1000)
  
  let curr_time
  let curr_hour = d.getHours()
  let curr_min = d.getMinutes()

  curr_min = curr_min<10?`0${curr_min}`:curr_min

  if(curr_hour>=12){
    curr_hour = curr_hour==12?12:curr_hour-12
    curr_time = `${curr_hour}:${curr_min} PM`
  }
  else{
    curr_hour = curr_hour==0?12:curr_hour
    curr_time = `${curr_hour}:${curr_min} AM`
  }

  // format time as (example: 2:23Am Tue, 2 Aug)
  const dateAndTime = `${curr_time} ${date}`


  return(
    <div className={'current-weather'}>
     <div className={"date"}>{dateAndTime}</div>
     <h1>{city}</h1>
     <h2>{country}</h2>
     <div className="text-center">
      <span>
        <div>{`${temp} °`}</div>
        <div>{capitalizeWords(description)}</div>
      </span>
      <img src={`http://openweathermap.org/img/w/${icon}.png`} alt={main} />
     </div>
    </div>
  )
}

CurrentWeather.proptypes = {
  selectedUnit: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  currentWeather: PropTypes.shape({
    temp: PropTypes.number.isRequired,
    weather: PropTypes.shape({
      id: PropTypes.number.isRequired,
      main: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
}

export default CurrentWeather