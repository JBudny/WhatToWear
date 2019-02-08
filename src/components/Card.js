// module "Card.js"
import React from 'react'
import Header from './Header'
import Content from './Content'

const cardStyle = {
  display: 'inline-block',
  width: '350px',
  height: '60vh',
  margin: '5px',
  border: '1px solid black'
}

const Card = ({cardName,cardContent}) => {
  return (
    <div className="Card" style={cardStyle}>
      <Header heading={cardName}/>
      <Content content={cardContent}/>
    </div>)
}

export default Card;
