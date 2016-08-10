import React, { PropTypes } from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import { convertUnit } from '../utils/ConvertUnit'

const ShortTermForecast = ({ unit, forecast }) => (
  <div className={"short-term-forecast"}>
    <h1>Short Term Forecast</h1>
    <ul className={"list-inline text-center"}>
      {
        forecast.map(f => {
          const key = f.FCTTIME.epoch
          const time = f.FCTTIME.civil.split(':')[0]
          const ampm = f.FCTTIME.ampm
          const { icon, icon_url, temp } = f
          const displayTemp = unit.toLowerCase()==='celsius'?temp.metric:temp.english
          return (
            <li key={key} className={"text-center"}>
              <div>{time}</div>
              <div>{ampm}</div>
              <div><img src={icon_url} alt={icon} /></div>
              <div>{`${displayTemp}°`}</div>
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