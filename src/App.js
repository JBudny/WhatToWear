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
const clothesData = [
  {cloth:'warmHat',minTemp:'-infinity',maxTemp:'15'},
  {cloth:'winterJacket',minTemp:'-infinity',maxTemp:'10'},
  {cloth:'thickGloves',minTemp:'-infinity',maxTemp:'10'},
  {cloth:'warmPants',minTemp:'-infinity',maxTemp:'10'},
  {cloth:'scarf',minTemp:'-infinity',maxTemp:'10'},
  {cloth:'sweater',minTemp:'-infinity',maxTemp:'10'},
  {cloth:'warmSocks',minTemp:'-infinity',maxTemp:'10'},
  {cloth:'winterShoes',minTemp:'-infinity',maxTemp:'10'},
  {cloth:'cap',minTemp:'16',maxTemp:'infinity'},
  {cloth:'springJacket',minTemp:'11',maxTemp:'15'},
  {cloth:'jeans',minTemp:'11',maxTemp:'24'},
  {cloth:'hoodie',minTemp:'11',maxTemp:'20'},
  {cloth:'boatSocks',minTemp:'11',maxTemp:'infinity'},
  {cloth:'regularShoes',minTemp:'11',maxTemp:'20'},
  {cloth:'tShirt',minTemp:'21',maxTemp:'infinity'},
  {cloth:'shorts',minTemp:'21',maxTemp:'infinity'},
  {cloth:'sandals',minTemp:'21',maxTemp:'infinity'},
  {cloth:'raincoat',minTemp:'-infinity',maxTemp:'infinity',rain:'1'},
  {cloth:'wellingtons',minTemp:'-infinity',maxTemp:'infinity',rain:'1'},
  {cloth:'umbrella',minTemp:'-infinity',maxTemp:'infinity',rain:'1'}
]

class Container extends Component {
  constructor() {
  super()
  this.state = {data: ''}
  }

  render() {
    return (
      <div className="container" style={containerStyle}>
          <InputLocation/>
          <Weather/>
          <OutfitPicture/>
          <OutfitDescription/>
      </div>
    )
  }
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
      <div style={{width:'100%',textAlign: 'center', margin: '15px'}} >
        <h2>Type your city</h2>
        <input type="text"/>
      </div>
    )}
}

class Weather extends Component {
  constructor(props){
    super(props)
    this.state = {}
    this.miasto = ''
    this.url = 'https://ipapi.co/json'
    this.weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?'
    this.weatherApiKey = 'APPID=9fc75b96c3e130cffdee8b45127936db&units=metric'
    navigator.geolocation.getCurrentPosition((position) => {
      this.lat = position.coords.latitude
      this.lon = position.coords.longitude
      fetch(this.weatherUrl+'lat='+this.lat+'&lon='+this.lon+'&'+this.weatherApiKey)
      .then((response) => response.json())
      .then((weatherData) => this.setState(weatherData))
    })
  }

  render() {
    return (
      <Card cardName='Weather info' cardContent={
            this.state.weather
            ?
            <React.Fragment>
              <span style={{lineHeight: '55px', margin: '5px'}}>Weather icon: </span>
              <img src={'https://openweathermap.org/img/w/'+this.state.weather[0].icon+'.png'}
              alt="" style={{ right: '0', top: '0',width:'35px'}}/>
              <ul style={{listStyleType: 'none', margin: '5px'}}>
                <li><span>City: </span>{this.state.name}</li>
                <li><span>Forecast: </span>{this.state.weather[0].description}</li>
                <li><span>Main: </span>{this.state.weather[0].main}</li>
                <li><span>Temperature: </span>{this.state.main.temp}<span>°C</span></li>
                <li><span>Min temperature: </span>{this.state.main.temp_min}<span>°C</span></li>
                <li><span>Max temperature: </span>{this.state.main.temp_max}<span>°C</span></li>
                <li><span>Humidity: </span>{this.state.main.humidity}<span>%</span></li>
                <li><span>Pressure: </span>{this.state.main.pressure}<span>hPa</span></li>
              </ul>
            </React.Fragment>
            :
            this.state.message
              ?
              <div style={{display:'flex',textAlign:'center',justifyContent:'center',flexDirection: 'column'}}>
                <span style={{display: 'inline', margin:'2px'}}>{this.state.message} ({this.miasto})</span>
              </div>
              :
              <div style={{display:'flex',textAlign:'center',justifyContent:'center',flexDirection: 'column'}}>
                <span style={{display: 'inline', margin:'2px'}}>To automatic geolocation, enable GPS and allow your browser to access the location</span>
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
        <Container/>
      </div>
    );
  }
}

export default App;
