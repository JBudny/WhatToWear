// module "InputLocation.js"
import React from 'react'
import uiStrings from './data/stringsEN'

const inputLocationStyle = {
    width: '100%',
    textAlign: 'center',
    margin: '15px'
}

const InputLocation = () => {
  return (
    <div style={inputLocationStyle}>
      <h2>{uiStrings.inputTitle}</h2>
      <input type="text"/>
    </div>)
}

export default InputLocation;
