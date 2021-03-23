import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import ReactGA from 'react-ga'

const trackingId = 'UA-83277161-1'
ReactGA.initialize(trackingId)

ReactDOM.render(<App />, document.getElementById('root'))
