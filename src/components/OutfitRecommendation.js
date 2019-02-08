// module "OutfitRecommendation.js"
import React, {Component} from 'react'
import Card from './Card'

class OutfitRecommendation extends Component {
constructor(props) {
  super(props)
}

render() {
  return (
    <Card cardName='What to wear?' cardContent={<ol style = {{marginLeft: '20px', marginTop:'10px'}} > {
      this.props.outfitData.map(data => {
        return <li>{data.description}</li>
      })
    }
    </ol>
    }/>)
}
}

export default OutfitRecommendation;
