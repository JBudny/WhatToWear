// module "OutfitRecommendation.js"
import React from 'react'
import Card from './Card'

const olStyle = {
  marginLeft: '20px',
  marginTop: '10px'
}

const OutfitRecommendation = ({outfitData}) => {
  return (
  <Card className="Card"
        cardName="What to wear?"
        cardContent={
          <ol style={olStyle}>
            {outfitData.map(data => {
              return <li>{data.description}</li>
            })}
        </ol>
      }
      />
    )
}

export default OutfitRecommendation;
