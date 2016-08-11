import React, { PropTypes } from 'react'
import { ListGroup, ListGroupItem, Table } from 'react-bootstrap'
import { convertUnit } from '../utils/ConvertUnit'
import { extractDate } from '../utils/ExtractDate'
import { capitalizeWords } from '../utils/CapitalizeWords'

/*
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
*/

const LongTermForecast = ({ unit, forecast }) => (
  <Table className={"text-center"}>
    <thead>
      <tr>
        <th></th>
        {forecast.map((f,i) => {
          return <th key={i} className={"text-center"}>{f.date.weekday_short}<br />{f.date.monthname_short} {f.date.day}</th>
        })}
      </tr>
    </thead>
    <tbody>
      <tr>
        <td></td>
        {forecast.map((f,i) => {
          return <td key={i}><img src={f.icon_url} alt={f.icon}/></td>
        })}
      </tr>
      <tr>
        <td>High</td>
        {forecast.map((f,i) => {
          const displayTemp = unit.toLowerCase()==='celsius'?f.high.celsius:f.high.fahrenheit
          return <td key={i}>{displayTemp}°</td>
        })}
      </tr>
      <tr>
        <td>Low</td>
        {forecast.map((f,i) => {
          const displayTemp = unit.toLowerCase()==='celsius'?f.low.celsius:f.low.fahrenheit
          return <td key={i}>{displayTemp}°</td>
        })}
      </tr>
      <tr>
        <td>Condition</td>
        {forecast.map((f,i) => {
          return <td key={i}>{f.conditions}</td>
        })}
      </tr>
      <tr>
        <td>POP</td>
        {forecast.map((f,i) => {
          return <td key={i}>{f.pop}%</td>
        })}
      </tr>
    </tbody>
  </Table>
)

LongTermForecast.propTypes = {
  unit: PropTypes.string.isRequired,
  forecast: PropTypes.array.isRequired
}

export default LongTermForecast