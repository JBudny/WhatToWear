import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import logo from './logo.svg'
import './App.css'
import Container from './components/Container'

class App extends Component {
render() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title" style={{
          textAlign: 'center'
        }}>Welcome to WhatToWear</h1>
      </header>
      <Container/>
    </div>);
}
}

export default App;
