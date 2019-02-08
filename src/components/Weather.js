// module "Weather.js"
import React, {Component} from 'react'
import Card from './Card'

class Weather extends Component {
constructor(props) {
  super(props)
}

render() {
  return (
    <Card cardName='Weather info' cardContent={
      this.props.weatherData.weather
        ? <React.Fragment>
          <span style={{lineHeight: '55px',margin: '5px'}}>Weather icon:</span>
          <img src={'https://openweathermap.org/img/w/' + this.props.weatherData.weather[0].icon + '.png'} alt="" style={{right: '0',top: '0',width: '35px'}}/>
          <ul style={{listStyleType: 'none',margin: '5px'}}>
            <li><span>City:</span>{this.props.weatherData.name}</li>
            <li><span>Forecast:</span>{this.props.weatherData.weather[0].description}</li>
            <li><span>Main:</span>{this.props.weatherData.weather[0].main}</li>
            <li><span>Temperature:</span>{this.props.weatherData.main.temp}<span>°C</span></li>
            <li><span>Min temperature:</span>{this.props.weatherData.main.temp_min}<span>°C</span></li>
            <li><span>Max temperature:</span>{this.props.weatherData.main.temp_max}<span>°C</span></li>
            <li><span>Humidity:</span>{this.props.weatherData.main.humidity}<span>%</span></li>
            <li><span>Pressure:</span>{this.props.weatherData.main.pressure}<span>hPa</span></li>
          </ul>
          {this.props.weatherData.error
            ?
              <div style={{display: 'flex',textAlign: 'left',justifyContent: 'center',flexDirection: 'column'}}>
                <span style={{display: 'inline',margin: '2px', color:'red'}}>{this.props.weatherData.error.message}</span>
                <span style={{display: 'inline',margin: '2px'}}>&nbsp;</span>
              </div>
            : null}
        </React.Fragment>
        :
        <div style={{display: 'flex',textAlign: 'center',justifyContent: 'center',flexDirection: 'column'}}>
          <span style={{display: 'inline',margin: '2px'}}>Can't get weather data. You can type your city by hand.</span>
        </div>}/>)
}
}

export default Weather;
