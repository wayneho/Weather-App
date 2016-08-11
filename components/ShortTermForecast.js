import React, { Component, PropTypes } from 'react'
import { ListGroup, ListGroupItem, Table } from 'react-bootstrap'
import { convertUnit } from '../utils/ConvertUnit'
import { Line } from 'react-chartjs'



class ShortTermForecast extends Component{
  constructor(){
    super()
    this.state = {
      legend: ''
    }
  }

  componentDidMount(){
    const legend = this.refs.chart.getChart().generateLegend()
    this.setState({legend})
  }

  render(){
    const { unit, forecast } = this.props
    const legend = this.state && this.state.legend || ''
    const labels = forecast.map(f=> {
      const time = f.FCTTIME.civil.split(':')[0]
      const ampm = f.FCTTIME.ampm
      return `${time} ${ampm}`
    })
    const tempData = forecast.map(hour => {
      const temp = unit.toLowerCase()==='celsius'?hour.temp.metric:hour.temp.english
      return parseInt(temp, 10)
    })
    const popData = forecast.map(f => {
      return f.pop
    })
    const lineData = {
      labels,
      datasets: [
        {
          label: `Temperature(${unit})`,
          fillColor: "rgba(255,255,102,0.2)",
          strokeColor: "rgba(255,255,102,1)",
          pointColor: "rgba(255,255,102,1)",
          data: tempData
        },
        {
          label: 'Precipitation(%)',
          fillColor: "rgba(65,105,225,0.2)",
          strokeColor: "rgba(65,105,225,1)",
          pointColor: "rgba(65,105,225,1)",
          data: popData
        }
      ]
    }

    const lineOptions = {
      scaleFontColor: "#a5d6ff",
      responsive: true,
      maintainAspectRatio: false,
      showTooltips: false,

    }

    return(
      <div>
      <Table className={"text-center"}>
        <thead>
          <tr>
            <th></th>
            {forecast.map(f => {
              const time = f.FCTTIME.civil.split(':')[0]
              const ampm = f.FCTTIME.ampm
              return <th className={"text-center"}>{time} {ampm}</th>
            })}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            {forecast.map(f => {
              return <td><img src={f.icon_url} alt={f.icon}/></td>
            })}
          </tr>
          <tr>
            <td>Temp</td>
            {forecast.map(f => {
              const displayTemp = unit.toLowerCase()==='celsius'?f.temp.metric:f.temp.english
              return <td>{displayTemp}°</td>
            })}
          </tr>
          <tr>
            <td>Feels like</td>
            {forecast.map(f => {
              const displayTemp = unit.toLowerCase()==='celsius'?f.feelslike.metric:f.feelslike.english
              return <td>{displayTemp}°</td>
            })}
          </tr>
          <tr>
            <td>POP</td>
            {forecast.map(f => {
              return <td>{f.pop}%</td>
            })}
          </tr>
        </tbody>
      </Table>
      <div>
        <Line ref="chart" data={lineData} options={lineOptions}/>
        <div dangerouslySetInnerHTML={{__html: legend}} />
      </div>

      </div>
    )
  }
}

ShortTermForecast.propTypes = {
  unit: PropTypes.string.isRequired,
  forecast: PropTypes.array.isRequired
}

export default ShortTermForecast