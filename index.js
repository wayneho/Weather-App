import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/App'
import Bootstrap from 'bootstrap/dist/css/bootstrap.css'
import configureStore from './store/configureStore'
import Stylesheet from './stylesheet.css'


const store = configureStore()

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)
