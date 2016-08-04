require("../stylesheet.css")
import React, { PropTypes } from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import { convertUnit } from '../utils/ConvertUnit'

function extractTime(date){
  let time = date.split(" ")[1]
  let hour = time.split(":")[0].replace(/^0+/, '')
  if(hour>=12)
    return `${hour==12?12:hour-12} PM`
  else
    return `${hour==0?12:hour} AM`
}

const ShortTermForecast = ({ unit, forecast }) => (
  <div className={"short-term-forecast"}>
    <h1>Short Term Forecast</h1>
    <ul className={"list-inline text-center"}>
      {
        forecast.map(f => {
          return (
            <li key={f.time} className={"text-center"}>
              <div>{extractTime(f.time)}</div>
              <div><img src={`http://openweathermap.org/img/w/${f.weather.icon}.png`} alt={f.weather.main} /></div>
              <div>{`${convertUnit(f.temp, unit)} °`}</div>
            </li>
          )
        })
    }
    </ul>
  </div>
)

ShortTermForecast.propTypes = {
  unit: PropTypes.string.isRequired,
  forecast: PropTypes.array.isRequired
}

export default ShortTermForecast