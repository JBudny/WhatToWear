// module "Header.js"
import React from 'react'

const headerStyle = {
    borderBottom: '1px solid black',
    height: '10%',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center'
}
const h2Style = {
     margin: 'auto'
}

const Header = ({heading}) => {
  return (
    <div style={headerStyle}>
      <h2 style={h2Style}>{heading}</h2>
    </div>)
}

export default Header;
