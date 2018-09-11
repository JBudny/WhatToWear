import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
const headerStyle = {
  borderBottom: '1px solid black',
  marginBottom: '15px',
  textAlign: 'center'
}
const cardStyle = {
  display: 'inline-block',
  width: '350px',
  height: '60vh',
  margin: '5px',
  border: '1px solid black'
}
const containerStyle = {
  margin: '15px',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'center',
}

class Header extends Component {
  render() {
    return (
      <div className="Hheader" style={headerStyle}>
        <h2>{this.props.heading}</h2>
      </div>
    )}
}

class Content extends Component {
  render() {
    return (
      <div className="Content">
        {this.props.content}
      </div>
    )}
}

class Card extends Component {
  render() {
    return (
      <div className="Card" style={cardStyle}>
        <Header heading={this.props.cardName}/>
        <Content content={this.props.cardContent}/>
      </div>
    )}
}

class InputLocation extends Component {
  render() {
    return (
      <div style={{textAlign: 'center'}} >
        <h2>Type your city</h2>
        <input type="text"/>
      </div>
    )}
}

class Weather extends Component {
  constructor(props){
    super(props)
    this.url = 'https://ipapi.co/json/'
    this.data = JSON.parse(this.httpGet(this.url))
    this.weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?q='+this.data.city+'&APPID=9fc75b96c3e130cffdee8b45127936db&units=metric'
    this.weatherData = JSON.parse(this.httpGet(this.weatherUrl))
    this.weatherData.weather[0].icon = 'http://openweathermap.org/img/w/'+this.weatherData.weather[0].icon+'.png'
    this.state = this.weatherData
  }

  httpGet(theUrl)
  {
      var xmlHttp = new XMLHttpRequest()
      xmlHttp.open( "GET", theUrl, false ) // false for synchronous request
      xmlHttp.send( null )
      return xmlHttp.responseText;
  }

  render() {
    return (
      <Card cardName='Weather info' cardContent=
        {<React.Fragment>
          <span style={{lineHeight: '55px', margin: '5px'}}>Weather icon: </span><img src={this.state.weather[0].icon} alt="" style={{ right: '0', top: '0',width:'35px'}}/>
          <ul style={{listStyleType: 'none', margin: '5px'}}>
            <li><span>City: </span>{this.state.name}</li>
            <li><span>Forecast: </span>{this.state.weather[0].description}</li>
            <li><span>Temperature: </span>{this.state.main.temp}<span>°C</span></li>
            <li><span>Min temperature: </span>{this.state.main.temp_min}<span>°C</span></li>
            <li><span>Max temperature: </span>{this.state.main.temp_max}<span>°C</span></li>
            <li><span>Humidity: </span>{this.state.main.humidity}<span>%</span></li>
            <li><span>Pressure: </span>{this.state.main.pressure}<span>hPa</span></li>
          </ul></React.Fragment>}
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
      <Card cardName='Description' cardContent=
               {<ul style={{listStyleType: 'none'}}>
                   <li>1</li>
                   <li>2</li>
                   <li>3</li>
                   <li>4</li>
                 </ul>}/>
    )}
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title" style={{textAlign: 'center'}} >Welcome to WhatToWear</h1>
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
