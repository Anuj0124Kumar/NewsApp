import React, { Component } from 'react'
import Navabar from './components/Navabar'
import News from './components/News'

export default class App extends Component {
  render() {
    return (
      <div>
        <Navabar/>
        <News/>
      </div>
    )
  }
}

