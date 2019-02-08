// module "header.js"

import React, {Component} from 'react'

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
