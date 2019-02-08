// module "Container.js"
import React, {Component} from 'react'
import OutfitPicture from './OutfitPicture'
import InputLocation from './InputLocation'
import Weather from './Weather'
import OutfitRecommendation from './OutfitRecommendation'

const containerStyle = {
  margin: '15px',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'center'
}

const clothesData = [
  {cloth:'warmHat',minTemp:'-20',maxTemp:'8',description:'Winter hat'},
  {cloth:'winterJacket',minTemp:'-20',maxTemp:'8',description:'Winter jacket'},
  {cloth:'thickGloves',minTemp:'-20',maxTemp:'5',description:'Winter gloves'},
  {cloth:'warmPants',minTemp:'-20',maxTemp:'8',description:'Winter pants'},
  {cloth:'scarf',minTemp:'-20',maxTemp:'10',description:'Scarf'},
  {cloth:'sweater',minTemp:'-20',maxTemp:'10',description:'Sweater'},
  {cloth:'warmSocks',minTemp:'-20',maxTemp:'10',description:'Warm socks'},
  {cloth:'winterShoes',minTemp:'-20',maxTemp:'10',description:'Winter shoes'},
  {cloth:'cap',minTemp:'16',maxTemp:'50',description:'Cap'},
  {cloth:'springJacket',minTemp:'9',maxTemp:'15',description:'Spring jacket'},
  {cloth:'jeans',minTemp:'9',maxTemp:'23',description:'Jeans'},
  {cloth:'hoodie',minTemp:'11',maxTemp:'23',description:'Hoodie'},
  {cloth:'boatSocks',minTemp:'11',maxTemp:'50',description:'Boat socks'},
  {cloth:'regularShoes',minTemp:'11',maxTemp:'23',description:'Regular shoes'},
  {cloth:'tShirt',minTemp:'24',maxTemp:'50',description:'T-shirt'},
  {cloth:'shorts',minTemp:'24',maxTemp:'50',description:'Shorts'},
  {cloth:'sandals',minTemp:'24',maxTemp:'50',description:'Sandals'},
  {cloth:'raincoat',minTemp:'-20',maxTemp:'50',rain:'1',description:'Raincoat'},
  {cloth:'wellingtons',minTemp:'-20',maxTemp:'50',rain:'1',description:'Wellingtons'},
  {cloth:'umbrella',minTemp:'-20',maxTemp:'50',rain:'1',description:'Umbrella'}
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
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude
        this.lon = position.coords.longitude
        this.getWeatherByCoords(this.lat, this.lon)
      }, (error) => this.getWeatherByIP(error))
    }else {
      this.error = {message: "Your browser doesn't support Geolocation_API"}
      this.getWeatherByIP(this.error)}
    }

getWeatherByCoords = (lat, lon) => {
  fetch(`${this.weatherUrl}lat=${lat}&lon=${lon}&${this.weatherApiKey}`)
  .then((response) => response.json())
  .then((weatherData) => this.getOutfitData(weatherData))
}

  getWeatherByIP = (error) => {
    fetch('https://ipapi.co/json/')
    .then((response) => response.json())
    .then((ipData) => {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ipData.city}&${this.weatherApiKey}`)
      .then((response) => response.json())
      .then((weatherData) => this.getOutfitData(weatherData))
      .then(() => {
        this.errorNotification = {message:''}
        this.errorNotification.message=`${error.message}. The weather is based on your IP and can be inacurate.`
        this.setState({error: this.errorNotification})})
    })
  }

  getOutfitData = (weatherData) => {
    this.outfitData = clothesData.filter((object) => {
      if(weatherData.weather){
        if (weatherData.weather.main !== 'rain' &&
        weatherData.weather.main !== 'thunderstorm' &&
        weatherData.weather.main !== 'shower rain') {
          if (weatherData.main.temp >= object.minTemp && object.rain !== '1') {
            if (weatherData.main.temp <= object.maxTemp) {
              return object.cloth
            }
          }
        } else if (weatherData.main.temp >= object.minTemp) {
            if (weatherData.main.temp <= object.maxTemp) {
              return object.cloth
            }
          }
      }
    return 0;
    })
    this.setState(weatherData)
  }

render() {
  return (
    <div className="container" style={containerStyle}>
      <InputLocation/>
      <Weather weatherData={this.state}/>
      <OutfitPicture weatherData={this.state}/> {
        this.outfitData.length > 1
          ? <OutfitRecommendation outfitData={this.outfitData}/>
          : null
      }
    </div>)
}
}

export default Container;
