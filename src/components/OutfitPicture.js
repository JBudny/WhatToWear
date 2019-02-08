// module "OutfitPicture.js"
import React, {Component} from 'react'
import Card from './Card'

class OutfitPicture extends Component {
constructor(props) {
  super(props)
}

componentDidMount() {}

render() {
  return (
    <Card cardName='Clothing picture' cardContent={<React.Fragment > </React.Fragment>}/>)
}
}

export default OutfitPicture;
