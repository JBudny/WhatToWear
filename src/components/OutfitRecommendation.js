// module "OutfitRecommendation.js"
import React from 'react';
import { injectIntl } from 'react-intl';
import styled from 'styled-components';
import Header from './Header';
import Content from './Content';

const WhatToWearCard = styled.div`
  padding: 0.5em;
  height: 100%;
  border: 1px solid black;
  flex-basis: 55%;
`;

const OutfitRecommendation = props => {
  const { intl, outfitData } = props;
  const { formatMessage } = intl;
  return (
    <WhatToWearCard className="WhatToWearBox">
      <Header
        cardName={formatMessage({
          id: `cardTitles.recommendation`,
          defaultMessage: `What to wear?`
        })}
      />
      <Content
        cardContent={
          <ol>
            {outfitData.map(cloth => {
              return (
                <li>
                  {formatMessage({
                    id: `clothes.${cloth.name}`,
                    defaultMessage: `${cloth.name}`
                  })}
                </li>
              );
            })}
          </ol>
        }
      />
    </WhatToWearCard>
  );
};

export default injectIntl(OutfitRecommendation);
