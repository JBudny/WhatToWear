// module "InputLocation.js"
import React from 'react';
import uiStrings from './data/stringsEN';

const inputLocationStyle = {
  width: '100%',
  textAlign: 'center',
  margin: '15px'
};

const InputLocation = props => {
  const suggestionsList = document.getElementById('suggestionsList');
  const cityListAutocomplete = event => {
    if (event.currentTarget.value.length >= 2) {
      fetch(
        `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/autocomplete/json?input=locality=
      ${event.currentTarget.value}&key=AIzaSyAds6n0BVkNWl3sIcPUs0B7SR47tfkPbek`
      )
        .then(suggestions => suggestions.json())
        .then(suggestions => suggestions.suggestions.map(cities => cities.description))
        .then(cities => {
          suggestionsList.innerHTML = '';
          cities.forEach(city => {
            const result = document.createElement('option');
            result.value = city;
            suggestionsList.appendChild(result);
          });
        })
        .catch(err => console.log(err));
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
      <h2>{uiStrings.inputTitle}</h2>
      <input
        id="suggestions"
        type="text"
        onChange={getWeatherBySelectedCity}
        name="City"
        onInput={cityListAutocomplete}
        list="suggestionsList"
        autoComplete="off"
        placeholder="e.g. Bangkok"
        onKeyUp={searchByEnterKey}
      />
      <datalist id="suggestionsList" />
      <button id="search" onClick={fireSearch} type="button">
        Search
      </button>
    </label>
  );
};

export default InputLocation;
