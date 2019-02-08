// module "InputLocation.js"
import React, {Component} from 'react'

class InputLocation extends Component {
render() {
  return (
    <div style={{
      width: '100%',
      textAlign: 'center',
      margin: '15px'
    }}>
      <h2>Type your city</h2>
      <input type="text"/>
    </div>)
}
}

export default InputLocation;
