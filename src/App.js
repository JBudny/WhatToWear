import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
const headerStyle = {
  borderBottom: '1px solid black',
  height: '10%',
  textAlign: 'center',
  display: 'flex',
  justifyContent: 'center',
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
        <h2 style={{margin: 'auto'}}>{this.props.heading}</h2>
      </div>
    )}
}

class Content extends Component {
  render() {
    return (
      <div className="Content" style={{height: '90%', width:'100%'}}>
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
      <div style={{textAlign: 'center', margin: '15px'}} >
        <h2>Type your city</h2>
        <input type="text"/>
      </div>
    )}
}

class Weather extends Component {
  constructor(props){
    super(props)
    this.state = {}
    this.url = 'https://ipapi.co/json'
    this.weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q='
    this.weatherApiKey = '&APPID=9fc75b96c3e130cffdee8b45127936db&units=metric'
    fetch(this.url)
      .then((response) => response.json())
      .then((ipData) =>
        fetch(this.weatherUrl+ipData.city+this.weatherApiKey)
        .then((response) => response.json())
        .then((weatherData) => this.setState(weatherData))
      )
  }

  render() {
    return (
      <Card cardName='Weather info' cardContent={
            this.state.weather
            ?
            <React.Fragment>
              <span style={{lineHeight: '55px', margin: '5px'}}>Weather icon: </span>
              <img src={'http://openweathermap.org/img/w/'+this.state.weather[0].icon+'.png'}
              alt="" style={{ right: '0', top: '0',width:'35px'}}/>
              <ul style={{listStyleType: 'none', margin: '5px'}}>
                <li><span>City: </span>{this.state.name}</li>
                <li><span>Forecast: </span>{this.state.weather[0].description}</li>
                <li><span>Temperature: </span>{this.state.main.temp}<span>°C</span></li>
                <li><span>Min temperature: </span>{this.state.main.temp_min}<span>°C</span></li>
                <li><span>Max temperature: </span>{this.state.main.temp_max}<span>°C</span></li>
                <li><span>Humidity: </span>{this.state.main.humidity}<span>%</span></li>
                <li><span>Pressure: </span>{this.state.main.pressure}<span>hPa</span></li>
              </ul>
            </React.Fragment>
            :
            <div style={{display:'flex',textAlign:'center',justifyContent:'center',flexDirection: 'column'}}>
              <span style={{display: 'inline', margin:'2px'}}>Loading...</span>
            </div>
        }/>
    )}
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
