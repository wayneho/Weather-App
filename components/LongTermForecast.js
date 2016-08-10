import React, { PropTypes } from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import { convertUnit } from '../utils/ConvertUnit'
import { extractDate } from '../utils/ExtractDate'
import { capitalizeWords } from '../utils/CapitalizeWords'

const LongTermForecast = ({ unit, forecast }) => (
  <div className={"long-term-forecast"}>
    <ul className="list-inline">
      {
        forecast.map(f => {
          const { epoch, day, monthname_short, weekday_short } = f.date
          const { high, low, conditions, icon, icon_url } = f
          const temp = unit.toLowerCase() === 'celsius' ? high.celsius : high.fahrenheit
          return (
            <li key={epoch} className={"text-center long-forecast-list"}>
              <div>{weekday_short}</div>
              <div>{monthname_short} {day}</div>
              <div><img src={icon_url} alt={icon} /></div>
              <div>{capitalizeWords(conditions)}</div>
              <div>{`${temp}°`}</div>
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