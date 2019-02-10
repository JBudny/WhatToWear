// module "InputLocation.js"
import React from 'react'

const inputLocationStyle = {
    width: '100%',
    textAlign: 'center',
    margin: '15px'
}

const InputLocation = () => {
  return (
    <div style={inputLocationStyle}>
      <h2>Type your city</h2>
      <input type="text"/>
    </div>)
}

export default InputLocation;
