// module "InputLocation.js"
import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import styled from 'styled-components';
import cityList from './data/city.list.min';

const InputPanel = styled.div`
  padding: 0.5em;
  border: 1px solid black;
  flex-basis: 45%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const InputLocation = props => {
  const { intl } = props;
  const { formatMessage } = intl;
  const suggestionsList = document.getElementById('suggestionsList');

  const cityListAutocomplete = event => {
    if (event.currentTarget.value.length >= 2) {
      cityList
        .filter(city => {
          if (city.name.includes(event.currentTarget.value)) {
            suggestionsList.innerHTML = '';
            return city.name;
          }
          return null;
        })
        .slice(1, 6)
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
    <InputPanel className="InputPanel">
      <label htmlFor="suggestions">
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
          placeholder={formatMessage({
            id: `inputLocation.placeholder`,
            defaultMessage: `e.g. Bangkok`
          })}
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
    </InputPanel>
  );
};

export default injectIntl(InputLocation);
