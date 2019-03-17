// module "Weather.js"
import React, { Fragment } from 'react';
import { injectIntl } from 'react-intl';
import Card from './Card';
import InputLocation from './InputLocation';

const Weather = props => {
  const { intl } = props;
  const { formatMessage } = intl;
  const { weatherData, notification, error } = props;

  const renderMainPanel = () => (
    <Fragment>
      <img
        src={`https://openweathermap.org/img/w/${
          weatherData.weather[0].icon
        }.png`}
        alt="weatherIcon"
      />
      {formatMessage({
        id: `weatherParams.forecast`,
        defaultMessage: `Forecast: `
      })}
      {weatherData.weather[0].description}
      {formatMessage({
        id: `weatherParams.main`,
        defaultMessage: `Main: `
      })}
      {weatherData.weather[0].main}
      {formatMessage({
        id: `weatherParams.temp`,
        defaultMessage: `Temp: `
      })}
      {weatherData.main.temp}
      <span>°C</span>
      <InputLocation getWeatherByCity={this.getWeatherByCity} />
    </Fragment>
  );

  // const RecommendationPanel = () => (
  //
  // )

  const renderWeather = () => (
    <Fragment>
      <ul>
        <li>
          {formatMessage({
            id: `weatherParams.city`,
            defaultMessage: `City: `
          })}
          {weatherData.name}
        </li>
        <li>
          {formatMessage({
            id: `weatherParams.country`,
            defaultMessage: `Country: `
          })}
          {weatherData.sys.country}
        </li>
        <li>
          {formatMessage({
            id: `weatherParams.minTemp`,
            defaultMessage: `MinTemp: `
          })}
          {weatherData.main.temp_min}
          <span>°C</span>
        </li>
        <li>
          {formatMessage({
            id: `weatherParams.maxTemp`,
            defaultMessage: `MaxTemp: `
          })}
          {weatherData.main.temp_max}
          <span>°C</span>
        </li>
        <li>
          {formatMessage({
            id: `weatherParams.humidity`,
            defaultMessage: `Humidity: `
          })}
          {weatherData.main.humidity}
          <span>%</span>
        </li>
        <li>
          {formatMessage({
            id: `weatherParams.pressure`,
            defaultMessage: `Pressure: `
          })}
          {weatherData.main.pressure}
          <span>hPa</span>
        </li>
      </ul>
      {notification ? (
        <div>
          <span>
            {formatMessage({
              id: `notifications.info.title`,
              defaultMessage: `INFO: `
            })}
            {notification}
          </span>
        </div>
      ) : null}
    </Fragment>
  );

  const renderError = () => (
    <Fragment>
      {error ? (
        <div className="Error">
          <span>
            {formatMessage({
              id: `notifications.criticalError.title`,
              defaultMessage: `CRITICAL ERROR:`
            })}
          </span>
          <span>
            {formatMessage({
              id: `notifications.criticalError.message`,
              defaultMessage: `MESSAGE: `
            })}
            {error.message}
          </span>
          <span>
            {formatMessage({
              id: `notifications.criticalError.stack`,
              defaultMessage: `STACK: `
            })}
            {error.stack}
          </span>
        </div>
      ) : null}
    </Fragment>
  );

  return (
    <Card
      cardContent={weatherData ? renderWeather(props) : renderError(props)}
    />
  );
};

export default injectIntl(Weather);
