import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class InputLocation extends Component {
  render() {
    return (
      <div>
        <h2>Type your city</h2>
        <input type="text"/>
      </div>)
  }
}

class OutfitPicture extends Component {
  render() {
    return (
      <div>
        <h2>Proposed clothing</h2>
        <img src="" alt=""/>
      </div>)
  }
}

class OutfitDescription extends Component {
  render() {
    return (
      <div>
        <h2>Description</h2>
        <div style={{display: 'inline-block'}}>
          <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
          </ul>
        </div>
      </div>)
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to WhatToWear</h1>
        </header>
        <InputLocation/>
        <OutfitPicture/>
        <OutfitDescription/>
      </div>);
  }
}

export default App;
