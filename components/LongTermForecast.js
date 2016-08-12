import React, { Component, PropTypes } from 'react'
import { ListGroup, ListGroupItem, Table } from 'react-bootstrap'
import capitalizeWords from '../utils/CapitalizeWords'


class LongTermForecast extends Component{
  constructor(){
    super()
    this.state = {
      windowWidth: window.innerWidth
    }
    this.handleResize = this.handleResize.bind(this)
  }
  handleResize(e) {
    this.setState({windowWidth: window.innerWidth})
  }
  componentDidMount() {
    window.addEventListener('resize', this.handleResize)
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  render(){
    const { unit, forecast } = this.props
    const { windowWidth } = this.state
    const u = unit.toLowerCase()==='celsius'?'celsius':'fahrenheit'

    return windowWidth >= 990
      ? <Table className={"text-center table-vertical"}>
          <thead>
            <tr>
              <th></th>
              {forecast.map((f,i) => {
                return <th key={i}>{f.date.weekday_short}<br />{f.date.monthname_short} {f.date.day}</th>
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
                return <td key={i}>{f.high[u]}°</td>
              })}
            </tr>
            <tr>
              <td>Low</td>
              {forecast.map((f,i) => {
                return <td key={i}>{f.low[u]}°</td>
              })}
            </tr>
            <tr>
              <td >Condition</td>
              {forecast.map((f,i) => {
                return <td className={"conditions"} key={i}>{f.conditions}</td>
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
      : <Table className={"text-center table-horizontal"}>
          <thead>
            <tr>
              <th></th>
              <th>Condition</th>
              <th>High</th>
              <th>Low</th>
              <th>POP</th>
            </tr>
          </thead>
          <tbody>
            {forecast.map((f,i) => {
              return(
                <tr key={i}>
                  <td style={{verticalAlign: 'middle'}}>{f.date.weekday_short}<br />{f.date.monthname_short} {f.date.day}</td>
                  <td style={{verticalAlign: 'middle'}}><img src={f.icon_url} alt={f.icon} /></td>
                  <td style={{verticalAlign: 'middle'}}>{f.high[u]}°</td>
                  <td style={{verticalAlign: 'middle'}}>{f.low[u]}°</td>
                  <td style={{verticalAlign: 'middle'}}>{f.pop}%</td>
                </tr>
                )
            })}
          </tbody>
        </Table>
    }
}

LongTermForecast.propTypes = {
  unit: PropTypes.string.isRequired,
  forecast: PropTypes.array.isRequired
}

export default LongTermForecast