// module "Container.js"
import React, { Component } from 'react';
import OutfitPicture from './OutfitPicture';
import InputLocation from './InputLocation';
import Weather from './Weather';
import OutfitRecommendation from './OutfitRecommendation';
import uiStrings from './data/stringsEN';

const { info, additions } = uiStrings.notifications;
const containerStyle = {
  margin: '15px',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'center'
};

class Container extends Component {
  constructor() {
    super();
    this.state = {};
    this.ipDataUrl = 'https://ipapi.co/json';
    this.weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?';
    this.weatherApiKey = 'APPID=9fc75b96c3e130cffdee8b45127936db&units=metric';
    this.outfitData = [];
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
          const notification = error.message + info.ipInfo;
          this.getIpData(notification);
        }
      );
    } else {
      const notification = info.support + info.ipInfo;
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
          message: `${error.message + additions.weatherData}`,
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
          message: `${error.message + additions.ipData}`,
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
          message: `${error.message + additions.weatherData}`,
          stack: error.stack
        };
        this.setState({ error });
      });
  };

  getOutfitData = weatherData => {
    this.outfitData = uiStrings.clothesData.filter(clothes => {
      const { main } = weatherData.weather;
      const { temp } = weatherData.main;
      const { rain, maxTemp, minTemp, cloth } = clothes;
      if (weatherData.weather) {
        if (
          main !== 'rain' &&
          main !== 'thunderstorm' &&
          main !== 'shower rain'
        ) {
          if (temp >= minTemp && rain !== '1') {
            if (temp <= maxTemp) {
              return cloth;
            }
          }
        } else if (temp >= minTemp) {
          if (temp <= maxTemp) {
            return cloth;
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

export default Container;
