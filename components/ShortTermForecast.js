import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import ReactCSSTransitionReplace from 'react-css-transition-replace'
import { ListGroup, ListGroupItem, Table, Tabs, Tab } from 'react-bootstrap'
import LineGraph from './LineGraph'

class ShortTermForecast extends Component{
  constructor(){
    super()
    this.state = {
      display: 'table'
    }
    this.handleSelect = this.handleSelect.bind(this)
  }

  handleSelect(display){
    this.setState({display}) 
  }

  render(){
    const { display } = this.state
    const { unit, forecast } = this.props
    const u = unit.toLowerCase()==='celsius'?'metric':'english'
    
    // generate legend for chart
    const legend = this.state && this.state.legend || ''

    //variables to construct line chart
    const labels = forecast.map(f=> {
      const time = f.FCTTIME.civil.split(':')[0]
      const ampm = f.FCTTIME.ampm
      return `${time} ${ampm}`
    })
    const tempData = forecast.map(hour => {
      return parseInt(hour.temp[u], 10)
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
      responsive: true,
      animation: false,
      height: 400,
      maintainAspectRatio: false
    }

    return(
      <div className={"short-term-forecast-container"}>
        <ul className={'select-hourly-forecast-view'}>
          <li className={display==='table'?'active-view':''} onClick={()=>this.handleSelect('table')}>Table</li>
          <li className={display==='graph'?'active-view':''} onClick={()=>this.handleSelect('graph')}>Graph</li>
        </ul>
        <ReactCSSTransitionReplace  transitionName="fade-wait" transitionEnterTimeout={450} transitionLeaveTimeout={150}>
        {display==='graph'
        ? <LineGraph lineData={lineData} lineOptions={lineOptions} key={'lineGraph'}/>
        : <div className={'hourly-forecast-table-container'} key={'table'}>
            <Table className={"text-center table-vertical"}>
              <thead>
                <tr>
                  <th></th>
                  {forecast.map((f,i) => {
                    const time = f.FCTTIME.civil.split(':')[0]
                    const ampm = f.FCTTIME.ampm
                    return <th key={i}>{time} {ampm}</th>
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
                    return <td key={i}>{f.feelslike[u]}°</td>
                  })}
                </tr>
                <tr>
                  <td>POP</td>
                  {popData.map((p,i)=>{return <td key={i}>{p}%</td>})}
                </tr>
              </tbody>
            </Table>
          </div>
        }
        </ReactCSSTransitionReplace>
      </div>
    )
  }
}

ShortTermForecast.propTypes = {
  unit: PropTypes.string.isRequired,
  forecast: PropTypes.array.isRequired
}

export default ShortTermForecast