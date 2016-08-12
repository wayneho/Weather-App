import React, { PropTypes } from 'react'
import capitalizeWords from '../utils/CapitalizeWords'
import hsvToRgb from '../utils/hsvToRgb'

/*
  color gradient range:
 - (40C >) = red
     ...
 - (-30C<) = blue
*/
function getColor(temp, unit){
  let hue = 0
  const multiplier = 255/70
  if(unit==='fahrenheit'){
    temp = (temp-32)*5/9
  }
  if(temp>40)
    hue = 0
  else if(temp < -30)
    hue = 255
  else
    hue = (40-temp)*multiplier
  return hsvToRgb({hue, sat: 1, val: 1})
}

const CurrentWeather = ({ selectedUnit, currentWeather }) => {
  const { full, country } = currentWeather.display_location
  const { observation_time, temp_c, temp_f, weather, 
    icon, icon_url, relative_humidity, wind_string, wind_dir,
    wind_kph, precip_1hr_metric } = currentWeather

  let temp = selectedUnit.toLowerCase() === 'celsius' ? temp_c : temp_f
  temp = Math.round(temp)

  const color = getColor(temp,selectedUnit.toLowerCase())

  return(
    <div className={'current-weather'}>
     <div className={"date"}>{observation_time}</div>
     <h2 style={{color: '#a5d6ff'}}>{full}</h2>
     <h3 style={{color: '#a5d6ff'}}>{country}</h3>
     <div className={"content-wrapper"}>
      <div className={"img-wrapper"}>
        <img src={icon_url} alt={icon} />
        <div className="other-weather-info" style={{color: '#a5d6ff'}}>
          <div>Precipitation: {precip_1hr_metric} mm</div>
          <div>Humidity: {relative_humidity}</div>
          <div>Wind: {wind_kph} km/h {wind_dir}</div>
        </div>
      </div>
      <div className={"current-temp-wrapper"} style={{color}}>
        <span className={"current-temp"}>{temp}</span><span className={'degree-symbol'}>°</span>
        <div className={"weather-condition"}>{capitalizeWords(weather)}</div>
      </div>
     </div>
    </div>
  )
}

CurrentWeather.proptypes = {
  selectedUnit: PropTypes.string.isRequired,
  currentWeather: PropTypes.object.isRequired
}

export default CurrentWeather