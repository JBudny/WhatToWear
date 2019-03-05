// module "Container.js"
import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import OutfitPicture from './OutfitPicture';
import InputLocation from './InputLocation';
import Weather from './Weather';
import OutfitRecommendation from './OutfitRecommendation';
import clothesData from './data/clothesData';

const containerStyle = {
  margin: '15px',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'center'
};

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.ipDataUrl = 'https://ipapi.co/json';
    this.weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?';
    this.weatherApiKey = 'APPID=9fc75b96c3e130cffdee8b45127936db&units=metric';
    this.outfitData = [];
    const { intl } = this.props;
    this.formatMessage = intl.formatMessage;
  }

  componentDidMount() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          this.getWeatherByCoords(lat, lon);
        },
        error => {
          const notification =
            error.message +
            this.formatMessage({ id: `notifications.info.ipInfo`, defaultMessage:`The weather is based on your IP and can be inacurate.` });
          this.getIpData(notification);
        }
      );
    } else {
      const notification =
        this.formatMessage({ id: `notifications.info.support`, defaultMessage:`Your browser doesn't support Geolocation_API` }) +
        this.formatMessage({ id: `notifications.info.ipInfo`, defaultMessage:`The weather is based on your IP and can be inacurate.` });
      this.getIpData(notification);
    }
  }

  getWeatherByCoords = (lat, lon) => {
    fetch(`${this.weatherUrl}lat=${lat}&lon=${lon}&${this.weatherApiKey}`)
      .then(weatherData => weatherData.json())
      .then(weatherData => this.getOutfitData(weatherData))
      .catch(error => {
        error = {
          error,
          message: `${error.message +
            this.formatMessage({ id: `notifications.additions.weatherData`, defaultMessage:` weather data.` })}`,
          stack: error.stack
        };
        this.setState({ error });
      });
  };

  getIpData = notification => {
    fetch(this.ipDataUrl)
      .then(ipData => ipData.json())
      .then(ipData => {
        this.getWeatherByCity(ipData.city, notification);
      })
      .catch(error => {
        error = {
          error,
          message: `${error.message +
            this.formatMessage({ id: `notifications.additions.ipData`, defaultMessage:` your ip data. You can try to type your city by hand.`  })}`,
          stack: error.stack
        };
        this.setState({ error });
      });
  };

  getWeatherByCity = (city, notification) => {
    fetch(`${this.weatherUrl}q=${city}&${this.weatherApiKey}`)
      .then(weatherData => weatherData.json())
      .then(weatherData => this.getOutfitData(weatherData))
      .then(() => this.setState({ notification }))
      .catch(error => {
        error = {
          error,
          message: `${error.message +
            this.formatMessage({ id: `notifications.additions.weatherData`, defaultMessage:` weather data.` })}`,
          stack: error.stack
        };
        this.setState({ error });
      });
  };

  getOutfitData = weatherData => {
    this.outfitData = clothesData.filter(clothData => {
      const { main } = weatherData.weather;
      const { temp } = weatherData.main;
      const { rain, maxTemp, minTemp, name } = clothData;
      if (weatherData.weather) {
        if (
          main !== 'rain' &&
          main !== 'thunderstorm' &&
          main !== 'shower rain'
        ) {
          if (temp >= minTemp && rain !== '1') {
            if (temp <= maxTemp) {
              return name;
            }
          }
        } else if (temp >= minTemp) {
          if (temp <= maxTemp) {
            return name;
          }
        }
      }
      return null;
    });
    this.setState({ weatherData });
  };

  render() {
    const { weatherData, error, notification } = this.state;
    return (
      <div style={containerStyle}>
        <InputLocation getWeatherByCity={this.getWeatherByCity} />
        <Weather
          weatherData={weatherData}
          error={error}
          notification={notification}
        />
        <OutfitPicture />
        {this.outfitData.length > 1 ? (
          <OutfitRecommendation outfitData={this.outfitData} />
        ) : null}
      </div>
    );
  }
}

export default injectIntl(Container);
