// module "InputLocation.js"
import React from 'react'
import uiStrings from './data/stringsEN'

const inputLocationStyle = {
    width: '100%',
    textAlign: 'center',
    margin: '15px'
}

const InputLocation=(props)=>{

const cityAutocomplete = (e) => {
  fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=locality=${e.currentTarget.value}&key=AIzaSyAds6n0BVkNWl3sIcPUs0B7SR47tfkPbek`)
  .then((predictions)=>predictions.json())
  .then((predictions)=>predictions.predictions.map((cities)=>cities.structured_formatting.main_text))
  .then((cities)=>{
    const predictionsList=document.getElementById('predictionsList');
    predictionsList.innerHTML = "";
    for (let i=0;i<cities.length;i++){
    const opcja = document.createElement('option')
    opcja.value = cities[i]
    predictionsList.appendChild(opcja)
    }
  })
  .catch((error)=>console.log(`autocomplete error: ${error}`))
}

const getWeatherFromList=()=> {
    const val = document.getElementById("predictions").value;
    const opts = document.getElementById('predictionsList').childNodes;
    for (let i = 0; i < opts.length; i++) {
      if (opts[i].value === val) {
        props.getWeatherByCity(opts[i].value)
      }
    }
  }

  return (
    <form style={inputLocationStyle} >
      <label>
        <h2>{uiStrings.inputTitle}</h2>
        <input id="predictions" type="search" onChange={getWeatherFromList}
               name="City" onInput={cityAutocomplete}
               list="predictionsList" autoComplete="off"
               placeholder="e.g. Bangkok"/>
        <datalist id="predictionsList"/>
      </label>
    </form>
  )

}

export default InputLocation;
