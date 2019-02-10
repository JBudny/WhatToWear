// module "OutfitRecommendation.js"
import React from 'react'
import Card from './Card'
import uiStrings from './data/stringsEN'

const olStyle = {
  marginLeft: '20px',
  marginTop: '10px'
}

const OutfitRecommendation = ({outfitData}) => {
  return (
  <Card className="Card"
        cardName={uiStrings.cardTitles.recommendation}
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
