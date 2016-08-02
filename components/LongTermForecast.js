require("../stylesheet.css")
import React, { PropTypes } from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import { convertUnit } from '../utils/ConvertUnit'
import { extractDate } from '../utils/ExtractDate'
import { capitalizeWords } from '../utils/CapitalizeWords'

const LongTermForecast = ({ unit, forecast }) => (
  <div className={"long-term-forecast"}>
    <h1>Long Term Forecast</h1>
    <ul className="list-inline">
      {
        forecast.map(f => {
          return (
            <li key={f.dt} className={"text-center long-forecast-list"}>
              <div>{extractDate(f.dt)}</div>
              <div><img src={`http://openweathermap.org/img/w/${f.weather.icon}.png`} alt={f.weather.main} /></div>
              <div>{capitalizeWords(f.weather.description)}</div>
              <div>{`${convertUnit(f.temp, unit)} °`}</div>
            </li>
          )
        })
    }
    </ul>
  </div>
)

LongTermForecast.propTypes = {
  unit: PropTypes.string.isRequired,
  forecast: PropTypes.array.isRequired
}

export default LongTermForecast