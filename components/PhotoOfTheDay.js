import React, { Component } from 'react'
import 'isomorphic-fetch'
import Spinner from 'react-spinner'

const key = 'cmZiEwrhdUIKKzic9Bt8eVD3rHJ4kYRVjqoUWSWW'

class PhotoOfTheDay extends Component{
  constructor(){
    super()
    this.state = { isLoading: true,
                   url: '',
                   title: '' }
  }
  componentDidMount(){
    fetch('https://api.nasa.gov/planetary/apod?api_key='+key)
      .then(res => {
        return res.json() 
      })
      .then(json => {
        this.setState({ isLoading: false,
                        url: json.url,
                        title: json.title})
      })
      .catch(er => {
        console.log(er)
      })
  }

  render(){
    const { isLoading, url, title } = this.state
    return (
      <div className="photo-of-the-day-container">
        <h1>Photo of the Day</h1>
        {isLoading
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

export default PhotoOfTheDay