import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
const headerStyle = {
  'borderBottom': '1px solid black',
  'marginBottom': '15px'
}
const cardStyle = {
  'display': 'inline-block',
  'width': '350px',
  'height': '60vh',
  'margin': '5px',
  'border': '1px solid black'
}
const containerStyle = {
  'margin': '15px',
  'display': 'flex',
  'flexWrap': 'wrap',
  'justifyContent': 'center',
  'alignItems': 'center'
}

class Header extends Component {
  render() {
    return (
      <div className="Hheader" style={headerStyle}>
        <h2>{this.props.heading}</h2>
      </div>
    )
  }
}

class Content extends Component {
  render() {
    return (
      <div className="Content">
        {this.props.content}
      </div>
    )
  }
}

class Card extends Component {
  render() {
    return (
      <div className="Card" style={cardStyle}>
        <Header heading={this.props.cardName}/>
        <Content content={this.props.cardContent}/>
      </div>
    )
  }
}

class InputLocation extends Component {
  render() {
    return (
      <div>
        <h2>Type your city</h2>
        <input type="text"/>
      </div>
    )
  }
}

class Weather extends Component {
  render() {
    return (
      <Card cardName='Weather info'
         cardContent=
         {
           <ul>
              <li>1</li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
              </ul>
        }
      />
    )
  }
}

class OutfitPicture extends Component {
  render() {
    return (
      <Card cardName='Clothing picture'
         cardContent={<img src = "" alt = {this.props.image} />}
      />
    )
  }
}

class OutfitDescription extends Component {
  render() {
    return (
      <Card cardName='Description'
               cardContent=
               {
                 <ul>
                   <li>1</li>
                   <li>2</li>
                   <li>3</li>
                   <li>4</li>
                 </ul>
              }
      />
    )
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
        <div className="Container" style={containerStyle}>
          <Weather/>
          <OutfitPicture/>
          <OutfitDescription/>
        </div>
      </div>
    );
  }
}

export default App;
