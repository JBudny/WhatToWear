// module "InputLocation.js"
import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import cityList from './data/city.list.min'

const inputLocationStyle = {
  width: '100%',
  textAlign: 'center',
  margin: '15px'
};

const InputLocation = props => {
  const { intl } = props
  const { formatMessage } = intl;
  const suggestionsList = document.getElementById('suggestionsList');

const cityListAutocomplete = event => {
  if (event.currentTarget.value.length >= 2) {
    cityList.filter(city => {
      if (city.name.includes(event.currentTarget.value)) {
        suggestionsList.innerHTML = '';
        return city.name
      };
      return null
    }).slice(1, 6)
    .forEach(city => {
      const result = document.createElement('option');
      result.value = city.name;
      suggestionsList.appendChild(result);
    });
  }
};

  const getWeatherBySelectedCity = () => {
    const inputValue = document.getElementById('suggestions').value;
    const options = document.getElementById('suggestionsList').childNodes;
    options.forEach(option => {
      if (option.value === inputValue) {
        props.getWeatherByCity(option.value);
      }
    });
  };

  const fireSearch = () => {
    const inputValue = document.getElementById('suggestions').value;
    if (inputValue.length > 0) {
      props.getWeatherByCity(inputValue);
    }
  };

  const searchByEnterKey = event => {
    if (event.keyCode === 13) {
      fireSearch();
    }
  };

  return (
    <label htmlFor="suggestions" style={inputLocationStyle}>
      <h2>
        <FormattedMessage
          id="inputLocation.title"
          defaultMessage="Type your city"
          description="Text above input"
        />
      </h2>
      <input
        id="suggestions"
        type="text"
        onChange={getWeatherBySelectedCity}
        name="City"
        onInput={cityListAutocomplete}
        list="suggestionsList"
        autoComplete="off"
        placeholder={formatMessage({ id: 'inputLocation.placeholder' })}
        onKeyUp={searchByEnterKey}
      />
      <datalist id="suggestionsList" />
      <button id="search" onClick={fireSearch} type="button">
        <FormattedMessage
          id="searchButton"
          defaultMessage="search"
          description="Search button"
        />
      </button>
    </label>
  );
};

export default injectIntl(InputLocation);
