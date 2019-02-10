import React from 'react'
import './css/App.css'
import Container from './Container'
import uiStrings from './data/stringsEN'

const App = () => {
    return (
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">{uiStrings.appTitle}</h1>
          </header>
          <Container/>
        </div>);
}

export default App;
