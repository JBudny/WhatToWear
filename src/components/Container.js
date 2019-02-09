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
    this.ipDataUrl = 'https://ipapi.co/json'
    this.weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?'
    this.weatherApiKey = 'APPID=9fc75b96c3e130cffdee8b45127936db&units=metric'
    this.outfitData = []
  }

  componentDidMount() {
    if ("geoloscation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude
        const lon = position.coords.longitude
        this.getWeatherByCoords(lat, lon)
      }, (error) => this.getIpData(error))
    }else {
      const notification = "Your browser doesn't support Geolocation_API."+
                           "The weather is based on your IP and can be inacurate."
      this.getIpData(notification)}
    }

getWeatherByCoords = (lat, lon) => {
  fetch(`${this.weatherUrl}lat=${lat}&lon=${lon}&${this.weatherApiKey}`)
  .then((weatherData) => weatherData.json())
  .then((weatherData) => this.getOutfitData(weatherData))
  .catch((error) => this.setState({error}))
}

  getIpData = (notification) => {
    fetch(this.ipDataUrl)
    .then((ipData) => ipData.json())
    .then((ipData) => {
      this.getWeatherByIp(ipData, notification)
    })
    .catch((error) => {
      error = {
        error,
        message:error.message+' your ip data. You can try to type your city by hand.',
        stack:error.stack,notification
      }
      this.setState({error})
    })
  }

  getWeatherByIp = (ipData, notification) => {
    fetch(`${this.weatherUrl}q=${ipData.city}&${this.weatherApiKey}`)
    .then((weatherData) => weatherData.json())
    .then((weatherData) => this.getOutfitData(weatherData))
    .then(() => this.setState({notification}))
    .catch((error) => {
      error = {
        error,
        message:error.message+' weather data.',
        stack:error.stack,notification
      }
      this.setState({error})
    })
  }

  getOutfitData = (weatherData) => {
    this.outfitData = clothesData.filter((clothes) => {
      const {main} = weatherData.weather
      const {temp} = weatherData.main
      const {rain, maxTemp, minTemp, cloth} = clothes
      if(weatherData.weather){
        if (main !== 'rain' &&
            main !== 'thunderstorm' &&
            main !== 'shower rain') {
              if (temp >= minTemp && rain !== '1') {
                if (temp <= maxTemp) {
                  return cloth
                }
              }
            } else if (temp >= minTemp) {
                if (temp <= maxTemp) {
                  return cloth
                }
              }
      }
    return 0
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

export default Container
