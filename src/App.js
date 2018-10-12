import React, {Component} from 'react'
import logo from './logo.svg'
import './App.css'
import ReactDOM from 'react-dom'
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
  {cloth:'warmHat',minTemp:'-20',maxTemp:'15'},
  {cloth:'winterJacket',minTemp:'-20',maxTemp:'10'},
  {cloth:'thickGloves',minTemp:'-20',maxTemp:'10'},
  {cloth:'warmPants',minTemp:'-20',maxTemp:'10'},
  {cloth:'scarf',minTemp:'-20',maxTemp:'10'},
  {cloth:'sweater',minTemp:'-20',maxTemp:'10'},
  {cloth:'warmSocks',minTemp:'-20',maxTemp:'10'},
  {cloth:'winterShoes',minTemp:'-20',maxTemp:'10'},
  {cloth:'cap',minTemp:'16',maxTemp:'50'},
  {cloth:'springJacket',minTemp:'11',maxTemp:'15'},
  {cloth:'jeans',minTemp:'11',maxTemp:'23'},
  {cloth:'hoodie',minTemp:'11',maxTemp:'23'},
  {cloth:'boatSocks',minTemp:'11',maxTemp:'50'},
  {cloth:'regularShoes',minTemp:'11',maxTemp:'23'},
  {cloth:'tShirt',minTemp:'24',maxTemp:'50'},
  {cloth:'shorts',minTemp:'24',maxTemp:'50'},
  {cloth:'sandals',minTemp:'24',maxTemp:'50'},
  {cloth:'raincoat',minTemp:'-20',maxTemp:'50',rain:'1'},
  {cloth:'wellingtons',minTemp:'-20',maxTemp:'50',rain:'1'},
  {cloth:'umbrella',minTemp:'-20',maxTemp:'50',rain:'1'}
]

class Container extends Component {
  constructor() {
  super()
  this.state = {}
  this.url = 'https://ipapi.co/json'
  this.weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?'
  this.weatherApiKey = 'APPID=9fc75b96c3e130cffdee8b45127936db&units=metric'
  this.outfitData = []
  }

  componentDidMount() {
        "geolocation" in navigator
        ?
        navigator.geolocation.getCurrentPosition((position) => {
          this.lat = position.coords.latitude
          this.lon = position.coords.longitude
          fetch(this.weatherUrl+'lat='+this.lat+'&lon='+this.lon+'&'+this.weatherApiKey)
          .then((response) => response.json())
          .then((weatherData) => {

            this.outfitData = clothesData.filter(function(object) {
              if (weatherData.weather.main != 'rain' &&
              weatherData.weather.main != 'thunderstorm' &&
              weatherData.weather.main != 'shower rain')
              {
                if (weatherData.main.temp_min>=object.minTemp && object.rain!='1')
                {
                  if (weatherData.main.temp_max<=object.maxTemp){
                    return object.cloth
                  }
                }
              }else{
                if (weatherData.main.temp_min>=object.minTemp)
                {
                  if (weatherData.main.temp_max<=object.maxTemp){
                    return object.cloth
                  }
                }
              }
            })
            this.setState(weatherData)
          })
        }, (error) => this.setState({error: error}))
        :
        this.setState({message: "Your browser doesn't support Geolocation_API."})
  }



  render() {
    return (
      <div className="container" style={containerStyle}>
        <InputLocation/>
        <Weather weatherData={this.state}/>
        <OutfitPicture weatherData={this.state}/>
        {
          this.outfitData.length>1
          ? <OutfitRecommendation outfitData={this.outfitData}/>
          : null
        }
      </div>
    )
  }
}

class Header extends Component {
  render() {
    return (
      <div className="Header" style={headerStyle}>
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
  }

  render() {
    return (
      <Card cardName='Weather info' cardContent={
            this.props.weatherData.weather
            ?
            <React.Fragment>
              <span style={{lineHeight: '55px', margin: '5px'}}>Weather icon: </span>
              <img src={'https://openweathermap.org/img/w/'+this.props.weatherData.weather[0].icon+'.png'}
              alt="" style={{ right: '0', top: '0',width:'35px'}}/>
              <ul style={{listStyleType: 'none', margin: '5px'}}>
                <li><span>City: </span>{this.props.weatherData.name}</li>
                <li><span>Forecast: </span>{this.props.weatherData.weather[0].description}</li>
                <li><span>Main: </span>{this.props.weatherData.weather[0].main}</li>
                <li><span>Temperature: </span>{this.props.weatherData.main.temp}<span>°C</span></li>
                <li><span>Min temperature: </span>{this.props.weatherData.main.temp_min}<span>°C</span></li>
                <li><span>Max temperature: </span>{this.props.weatherData.main.temp_max}<span>°C</span></li>
                <li><span>Humidity: </span>{this.props.weatherData.main.humidity}<span>%</span></li>
                <li><span>Pressure: </span>{this.props.weatherData.main.pressure}<span>hPa</span></li>
              </ul>
            </React.Fragment>
            :
            this.props.weatherData.message
              ?
              <div style={{display:'flex',textAlign:'left',justifyContent:'center',flexDirection: 'column'}}>
                <span style={{display: 'inline', margin:'2px'}}>{this.props.weatherData.message}</span>
                  <span style={{display: 'inline', margin:'2px'}}>You can type your city by hand.</span>
              </div>
              :
              this.props.weatherData.error
              ?
              <div style={{display:'flex',textAlign:'left',justifyContent:'center',flexDirection: 'column'}}>
                <span style={{display: 'inline', margin:'2px'}}>Error info</span>
                <span style={{display: 'inline', margin:'2px'}}>code: "{this.props.weatherData.error.code}"</span>
                <span style={{display: 'inline', margin:'2px'}}>message: "{this.props.weatherData.error.message}"</span>
                <span style={{display: 'inline', margin:'2px'}}>&nbsp;</span>
                <span style={{display: 'inline', margin:'2px'}}>How to resolve?</span>
                <span style={{display: 'inline', margin:'2px'}}>1. Check if your url begin with HTTPS.</span>
                <span style={{display: 'inline', margin:'2px'}}>2. Turn on GPS on your mobile device.</span>
                <span style={{display: 'inline', margin:'2px'}}>3. Allow browser to get your location.</span>
              </div>
              :
              <div style={{display:'flex',textAlign:'center',justifyContent:'center',flexDirection: 'column'}}>
                <span style={{display: 'inline', margin:'2px'}}>Loading...</span>
              </div>
        }/>
    )}
}

class OutfitPicture extends Component {
  constructor(props){
    super(props)
  }

  componentDidMount() {
  }

  render() {
    return (
      <Card cardName='Clothing picture'
         cardContent={
           <React.Fragment>

           </React.Fragment>
         }
      />
    )
  }
}

class OutfitRecommendation extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <Card cardName='What to wear?' cardContent={
        <ol style={{marginLeft: '20px', marginTop:'10px'}}>
          {
            this.props.outfitData.map(data => {
            return <li>{data.cloth}</li>
            })
          }
        </ol>
      }/>
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
