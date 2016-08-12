import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { ListGroup, ListGroupItem, Table, Tabs, Tab } from 'react-bootstrap'
import { convertUnit } from '../utils/ConvertUnit'
import { Line } from 'react-chartjs'



class ShortTermForecast extends Component{
  constructor(){
    super()
    this.state = {
      legend: '',
      display: 'graph'
    }
    this.handleSelect = this.handleSelect.bind(this)
  }

  componentDidMount(){
    const legend = this.refs.chart.getChart().generateLegend()
    this.setState({legend})
  }

  handleSelect(display){
    this.setState({display}) 
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
          label: `Temperature`,
          fillColor: "rgba(255,255,102,0.2)",
          strokeColor: "rgba(255,255,102,1)",
          pointColor: "rgba(255,255,102,1)",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(255,255,102,1)",
          data: tempData
        },
        {
          label: 'Precipitation(%)',
          fillColor: "rgba(65,105,225,0.2)",
          strokeColor: "rgba(65,105,225,1)",
          pointColor: "rgba(65,105,225,1)",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(65,105,225,1)",
          data: popData
        }
      ]
    }

    const lineOptions = {
      scaleFontColor: "#a5d6ff",
      responsive: true
    }

    return(
      <div>
      <Tabs activeKey={this.state.display} onSelect={this.handleSelect} id="controlled-tab">
        <Tab eventKey={'graph'} title="Graph">
          <div>
            <Line ref="chart" data={lineData} options={lineOptions}/>
            <div dangerouslySetInnerHTML={{__html: legend}} />
          </div>
        </Tab>
        <Tab eventKey={'table'} title="Table">
          <Table className={"text-center"}>
            <thead>
              <tr>
                <th></th>
                {forecast.map((f,i) => {
                  const time = f.FCTTIME.civil.split(':')[0]
                  const ampm = f.FCTTIME.ampm
                  return <th key={i} className={"text-center"}>{time} {ampm}</th>
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
                <td>Temp</td>
                {tempData.map(((t,i)=>{return <td key={i}>{t}°</td>}))}
              </tr>
              <tr>
                <td>Feels like</td>
                {forecast.map((f,i) => {
                  const displayTemp = unit.toLowerCase()==='celsius'?f.feelslike.metric:f.feelslike.english
                  return <td key={i}>{displayTemp}°</td>
                })}
              </tr>
              <tr>
                <td>POP</td>
                {popData.map((p,i)=>{return <td key={i}>{p}%</td>})}
              </tr>
            </tbody>
          </Table>
        </Tab>
      </Tabs>
      </div>
    )
  }
}

ShortTermForecast.propTypes = {
  unit: PropTypes.string.isRequired,
  forecast: PropTypes.array.isRequired
}

export default ShortTermForecast