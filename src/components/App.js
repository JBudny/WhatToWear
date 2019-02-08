import React from 'react'
import './App.css'
import Container from './Container'

const App = () => {
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

export default App;
