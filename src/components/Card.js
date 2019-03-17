// module "Card.js"
import React from 'react';
import Header from './Header';
import Content from './Content';

const Card = ({ className, cardName, cardContent }) => {
  return (
    <div className={className}>
      <Header heading={cardName} />
      <Content content={cardContent} />
    </div>
  );
};

export default Card;
