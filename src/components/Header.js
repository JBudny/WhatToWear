// module "Header.js"
import React from 'react';

const Header = ({ cardName }) => {
  return (
    <div className="Header">
      <h2>{cardName}</h2>
    </div>
  );
};

export default Header;
