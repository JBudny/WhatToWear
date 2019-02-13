// module "Weather.js"
import React, {Fragment} from 'react'
import Card from './Card'
import './css/Weather.css'
import uiStrings from './data/stringsEN'

const Weather = (props) => {
  const {weatherData, notification, error} = props
  const {icon, city, country, forecast, main, temp, minTemp, maxTemp, humidity, pressure} = uiStrings.weatherParams
  const {title, message, stack} = uiStrings.notifications.criticalError

  const renderWeather = () => (
  <Fragment>
    <span>{icon}</span>
    <img src={`https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} alt=""/>
    <ul>
      <li>{city}{weatherData.name}</li>
      <li>{country}{weatherData.sys.country}</li>
      <li>{forecast}{weatherData.weather[0].description}</li>
      <li>{main}{weatherData.weather[0].main}</li>
      <li>{temp}{weatherData.main.temp}<span>°C</span></li>
      <li>{minTemp}{weatherData.main.temp_min}<span>°C</span></li>
      <li>{maxTemp}{weatherData.main.temp_max}<span>°C</span></li>
      <li>{humidity}{weatherData.main.humidity}<span>%</span></li>
      <li>{pressure}{weatherData.main.pressure}<span>hPa</span></li>
    </ul>
    {
      notification
      ?
        <div>
          <span>{uiStrings.notifications.info.title}{notification}</span>
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
    <div className="Error">
      <span>{title}</span>
      <span>{message}{error.message}</span>
      <span>{stack}{error.stack}</span>
    </div>
    :null
  }
  </Fragment>
)

  return (
    <Card cardName={uiStrings.cardTitles.weather} cardContent={
      weatherData
        ?
        renderWeather(props)
        :
        renderError(props)
    }/>
  )
}

export default Weather;
