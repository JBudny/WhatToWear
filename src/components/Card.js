// module "Card.js"
import React, {Component} from 'react'
import Header from './Header'
import Content from './Content'

const cardStyle = {
  display: 'inline-block',
  width: '350px',
  height: '60vh',
  margin: '5px',
  border: '1px solid black'
}

class Card extends Component {
render() {
  return (
    <div className="Card" style={cardStyle}>
      <Header heading={this.props.cardName}/>
      <Content content={this.props.cardContent}/>
    </div>)
}
}

export default Card;
