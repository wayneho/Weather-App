import React, { Component } from 'react'
import { connect } from 'react-redux'
import 'isomorphic-fetch'
import Spinner from 'react-spinner'

const key = 'cmZiEwrhdUIKKzic9Bt8eVD3rHJ4kYRVjqoUWSWW'

class PhotoOfTheDay extends Component{
  constructor(){
    super()
  }

  render(){
    const { url, title } = this.props
    return (
      <div className="photo-of-the-day-container">
        <h3 style={{color: '#a5d6ff'}}>Photo of the Day</h3>
        {!url
          ?<Spinner />
          :<div className='photo-wrapper'>
            <img src={url} />
            <div className="photo-title">{title}</div>
          </div>
        }
      </div>
      )
  }
}

const mapStateToProps = (state) => {
  return{
    url: state.photoOfTheDay.url,
    title: state.photoOfTheDay.title
  }
}

export default connect(mapStateToProps)(PhotoOfTheDay)