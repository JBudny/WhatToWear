// module "OutfitRecommendation.js"
import React from 'react'
import Card from './Card'

const OutfitRecommendation = ({outfitData}) => {
return (
  <Card cardName='What to wear?' cardContent=
  {<ol style = {{marginLeft: '20px', marginTop:'10px'}} > {
    outfitData.map(data => {
      return <li>{data.description}</li>
    })
  }
  </ol>
  }/>)
}

export default OutfitRecommendation;
