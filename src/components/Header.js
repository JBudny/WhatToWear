// module "Header.js"
import React from 'react'

const headerStyle = {
  borderBottom: '1px solid black',
  height: '10%',
  textAlign: 'center',
  display: 'flex',
  justifyContent: 'center'
}

const Header = ({heading}) => {
  return (
    <div className="Header" style={headerStyle}>
      <h2 style={{
        margin: 'auto'
      }}>{heading}</h2>
    </div>)
}

export default Header;
