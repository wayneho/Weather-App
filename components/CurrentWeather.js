import React, { PropTypes } from 'react'
import { convertUnit } from '../utils/ConvertUnit'
import { capitalizeWords } from '../utils/CapitalizeWords'
import { extractDate } from '../utils/ExtractDate'

const CurrentWeather = ({ selectedUnit, currentWeather }) => {
  const { full, country } = currentWeather.display_location
  const { observation_time, temp_c, temp_f, weather, icon, icon_url } = currentWeather


  const temp = selectedUnit.toLowerCase() === 'celsius' ? temp_c : temp_f

/* get current time
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
*/

  return(
    <div className={'current-weather'}>
     <div className={"date"}>{observation_time}</div>
     <h1>{full}</h1>
     <h2>{country}</h2>
     <div className="text-center">
      <span>
        <div>{`${Math.round(temp)}°`}</div>
        <div>{capitalizeWords(weather)}</div>
      </span>
      <img src={icon_url} alt={icon} />
     </div>
    </div>
  )
}

CurrentWeather.proptypes = {
  selectedUnit: PropTypes.string.isRequired,
  currentWeather: PropTypes.object.isRequired
}

export default CurrentWeather