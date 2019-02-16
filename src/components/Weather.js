// module "Weather.js"
import React, {Fragment} from 'react'
import { injectIntl } from 'react-intl';
import Card from './Card'
import './css/Weather.css'

const Weather = (props) => {
  const { intl } = props;
  const { formatMessage } = intl;
  const {weatherData, notification, error} = props

  const renderWeather = () => (
  <Fragment>
    <span>{formatMessage({ id: "weatherParams.icon"})}</span>
    <img src={`https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} alt=""/>
    <ul>
      <li>{formatMessage({ id: "weatherParams.city"})}{weatherData.name}</li>
      <li>{formatMessage({ id: "weatherParams.country"})}{weatherData.sys.country}</li>
      <li>{formatMessage({ id: "weatherParams.forecast"})}{weatherData.weather[0].description}</li>
      <li>{formatMessage({ id: "weatherParams.main"})}{weatherData.weather[0].main}</li>
      <li>{formatMessage({ id: "weatherParams.temp"})}{weatherData.main.temp}<span>°C</span></li>
      <li>{formatMessage({ id: "weatherParams.minTemp"})}{weatherData.main.temp_min}<span>°C</span></li>
      <li>{formatMessage({ id: "weatherParams.maxTemp"})}{weatherData.main.temp_max}<span>°C</span></li>
      <li>{formatMessage({ id: "weatherParams.humidity"})}{weatherData.main.humidity}<span>%</span></li>
      <li>{formatMessage({ id: "weatherParams.pressure"})}{weatherData.main.pressure}<span>hPa</span></li>
    </ul>
    {
      notification
      ?
        <div>
          <span>{formatMessage({ id: "notifications.info.title"})}{notification}</span>
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
      <span>{formatMessage({ id: "notifications.criticalError.title"})}</span>
      <span>{formatMessage({ id: "notifications.criticalError.message"})}{error.message}</span>
      <span>{formatMessage({ id: "notifications.criticalError.stack"})}{error.stack}</span>
    </div>
    :null
  }
  </Fragment>
)

  return (
    <Card cardName={formatMessage({ id: "cardTitles.weather"})} cardContent={
      weatherData
        ?
        renderWeather(props)
        :
        renderError(props)
    }/>
  )
}

export default injectIntl(Weather);
