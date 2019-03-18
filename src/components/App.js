import React, { Fragment, Component } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { injectIntl } from 'react-intl';
import reset from 'styled-reset';
import OutfitPicture from './OutfitPicture';
import MainWeatherInfo from './MainWeatherInfo';
import OutfitRecommendation from './OutfitRecommendation';
import InputLocation from './InputLocation';
import clothesData from './data/clothesData';

const vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

const GlobalStyle = createGlobalStyle`
  ${reset}

  html {
  box-sizing: border-box;
}

*,
 *::before,
 *::after {
   box-sizing: inherit;
}
`;

const Wrapper = styled.div`
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);

  @media screen and (max-width: 425px) {
    display: flex;
    flex-direction: column;
  }
`;

const MainPanel = styled.div`
  padding: 0.5em;
  height: 50%;

  @media screen and (max-width: 425px) {
    display: flex;
    flex-direction: column;
  }
`;

const OutfitPanel = styled.div`
  padding: 0.5em;
  height: 30%;
  h2 {
    margin-bottom: 0.5em;
  }

  @media screen and (max-width: 425px) {
    display: flex;
    flex-direction: row;
  }
`;

const DetailsPanel = styled.div`
  padding: 0.5em;
  height: 20%;

  .LocationInfo {
    padding-bottom: 0.5em;
    text-align: center;
    font-size: 1.5em;
    height: 30%;
  }

  .weatherData {
    width: 100%;
    height: 70%;
  }

  .weatherData > * {
    text-align: center;
    height: 100%;
    width: 25%;
    display: inline-block;
  }
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.ipDataUrl = 'https://ipapi.co/json';
    this.weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?';
    this.weatherApiKey = 'APPID=9fc75b96c3e130cffdee8b45127936db&units=metric';
    this.outfitData = [];
    this.mainPanelData = [];
    this.weatherData = {};
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
            this.formatMessage({
              id: `notifications.info.ipInfo`,
              defaultMessage: `The weather is based on your IP and can be inacurate.`
            });
          this.getIpData(notification);
        }
      );
    } else {
      const notification =
        this.formatMessage({
          id: `notifications.info.support`,
          defaultMessage: `Your browser doesn't support Geolocation_API`
        }) +
        this.formatMessage({
          id: `notifications.info.ipInfo`,
          defaultMessage: `The weather is based on your IP and can be inacurate.`
        });
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
            this.formatMessage({
              id: `notifications.additions.weatherData`,
              defaultMessage: ` weather data.`
            })}`,
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
            this.formatMessage({
              id: `notifications.additions.ipData`,
              defaultMessage: ` your ip data. You can try to type your city by hand.`
            })}`,
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
            this.formatMessage({
              id: `notifications.additions.weatherData`,
              defaultMessage: ` weather data.`
            })}`,
          stack: error.stack
        };
        this.setState({ error });
      });
  };

  getOutfitData = weatherData => {
    this.weatherData = weatherData;
    console.log(this.weatherData.sys.country);
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
    const mainPanelData = {
      icon: weatherData.weather[0].icon,
      temp: weatherData.main.temp,
      main: weatherData.weather[0].main,
      description: weatherData.weather[0].description
    };
    this.setState({ mainPanelData });
  };

  render() {
    const { error, notification, mainPanelData } = this.state;
    return (
      <Fragment>
        <GlobalStyle />
        <Wrapper className="App">
          <MainPanel className="MainPanel" mainPanelData={mainPanelData}>
            <MainWeatherInfo mainPanelData={mainPanelData} />
            <InputLocation getWeatherByCity={this.getWeatherByCity} />
          </MainPanel>
          {this.outfitData.length > 1 ? (
            <OutfitPanel
              className="OutfitPanel"
              outfitData=""
              error={error}
              notification={notification}
            >
              <OutfitRecommendation outfitData={this.outfitData} />
              <OutfitPicture />
            </OutfitPanel>
          ) : null}

          {this.weatherData.main ? (
            <DetailsPanel className="DetailsPanel">
              <div className="LocationInfo">{`${this.weatherData.name}, ${
                this.weatherData.sys.country
              }`}</div>
              <ul className="weatherData">
                <li>
                  <span>
                    {this.weatherData.main.temp_max +
                      this.props.intl.formatMessage({
                        id: `additions.temp`,
                        defaultMessage: ` °C`
                      })}
                  </span>
                </li>
                <li>
                  <span>
                    {this.weatherData.main.temp_min +
                      this.props.intl.formatMessage({
                        id: `additions.temp`,
                        defaultMessage: ` °C`
                      })}
                  </span>
                </li>
                <li>
                  <span>{`${this.weatherData.main.humidity} %`}</span>
                </li>
                <li>
                  <span>{`${this.weatherData.main.pressure} hPa`}</span>
                </li>
              </ul>
            </DetailsPanel>
          ) : null}
        </Wrapper>
      </Fragment>
    );
  }
}

export default injectIntl(App);
