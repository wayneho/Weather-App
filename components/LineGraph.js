import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Line } from 'react-chartjs'

class LineGraph extends Component{
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

  componentDidUpdate(){
    //ReactDOM.findDOMNode(this).scrollIntoView()
  }

  render(){
    const { lineData, lineOptions } = this.props
    const { legend } = this.state
    return <div>
            <div className={'line-chart-legend'} dangerouslySetInnerHTML={{__html: legend}} />
            <Line ref="chart" data={lineData} options={lineOptions}/>
           </div>
  }
}

const mapStateToProps = (state, ownProps) => {
  return{
    lineData: ownProps.lineData,
    lineOptions: ownProps.lineOptions
  }
}

export default connect(mapStateToProps)(LineGraph)