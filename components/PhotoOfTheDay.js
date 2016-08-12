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
    const { url, title, copyright } = this.props
    return (
      <div className="photo-of-the-day-container" style={{color: '#a5d6ff'}}>
        <h3>Photo of the Day</h3>
        {!url
          ?<Spinner />
          :<div className='photo-wrapper'>
            <img src={url} />
            <div className='photo-info-wrapper'>
              <div className="photo-title">{title}</div>
              <div className="photo-credits">Image Credits: {copyright}</div>
            </div>
          </div>
        }
      </div>
      )
  }
}

const mapStateToProps = (state) => {
  return{
    url: state.photoOfTheDay.url,
    title: state.photoOfTheDay.title,
    copyright: state.photoOfTheDay.copyright
  }
}

export default connect(mapStateToProps)(PhotoOfTheDay)