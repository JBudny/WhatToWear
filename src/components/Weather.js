// module "Weather.js"
import React, {Fragment} from 'react'
import Card from './Card'

const Weather = (props)=> {
  const {weatherData, notification, error} = props
const renderWeather = () => (
  <Fragment>
    <span style={{lineHeight: '55px',margin: '5px'}}>Weather icon:</span>
    <img src={`https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} alt="" style={{right: '0',top: '0',width: '35px'}}/>
    <ul style={{listStyleType: 'none',margin: '5px'}}>
      <li><span>City:</span>{weatherData.name}</li>
      <li><span>Forecast:</span>{weatherData.weather[0].description}</li>
      <li><span>Main:</span>{weatherData.weather[0].main}</li>
      <li><span>Temperature:</span>{weatherData.main.temp}<span>°C</span></li>
      <li><span>Min temperature:</span>{weatherData.main.temp_min}<span>°C</span></li>
      <li><span>Max temperature:</span>{weatherData.main.temp_max}<span>°C</span></li>
      <li><span>Humidity:</span>{weatherData.main.humidity}<span>%</span></li>
      <li><span>Pressure:</span>{weatherData.main.pressure}<span>hPa</span></li>
    </ul>
    {
      notification
      ?
        <div style={{display: 'flex',textAlign: 'left',justifyContent: 'center',flexDirection: 'column'}}>
          <span style={{display: 'inline',margin: '2px', color:'blue', fontSize:'0.82em'}}>INFO: {notification}</span>
        </div>
      : null
    }
  </Fragment>
)

const renderError = () => (
  <Fragment>
  {
    error
    ?
    <div style={{display: 'flex',textAlign: 'left',justifyContent: 'center',flexDirection: 'column'}}>
      <span style={{display: 'inline',margin: '2px', color:'red', fontSize:'0.82em'}}>CRITICAL ERROR</span>
      <span style={{display: 'inline',margin: '2px', color:'red', fontSize:'0.82em'}}>MESSAGE: {error.message}</span>
      <span style={{display: 'inline',margin: '2px', color:'red', fontSize:'0.82em'}}>STACK: {error.stack}</span>
    </div>
    :null
  }
  </Fragment>
)

  return (
    <Card cardName='Weather info' cardContent={
      weatherData
        ?
        renderWeather(props)
        :
        renderError(props)
    }/>
  )
}

export default Weather;
