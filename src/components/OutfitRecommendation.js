// module "OutfitRecommendation.js"
import React from 'react';
import { injectIntl } from 'react-intl';
import Card from './Card';

const olStyle = {
  marginLeft: '20px',
  marginTop: '10px'
};

const OutfitRecommendation = props => {
  const { intl, outfitData } = props;
  const { formatMessage } = intl;
  return (
    <Card
      className="Card"
      cardName={formatMessage({ id: `cardTitles.recommendation`, defaultMessage:`What to wear?` })}
      cardContent={
        <ol style={olStyle}>
          {outfitData.map(cloth => {
            return <li>{formatMessage({ id: `clothes.${cloth.name}`, defaultMessage:`${cloth.name}` })}</li>;
          })}
        </ol>
      }
    />
  );
};

export default injectIntl(OutfitRecommendation);
