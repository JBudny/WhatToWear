// module "Header.js"
import React, {Component} from 'react'

const headerStyle = {
  borderBottom: '1px solid black',
  height: '10%',
  textAlign: 'center',
  display: 'flex',
  justifyContent: 'center'
}

class Header extends Component {
render() {
  return (
    <div className="Header" style={headerStyle}>
      <h2 style={{
        margin: 'auto'
      }}>{this.props.heading}</h2>
    </div>)
}
}

export default Header;
