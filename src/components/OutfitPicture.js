// module "OutfitPicture.js"
import React, { Fragment } from 'react';
import { injectIntl } from 'react-intl';
import styled from 'styled-components';
import Header from './Header';
import Content from './Content';

const OutfitCard = styled.div`
  padding: 0.5em;
  height: 100%;
  border: 1px solid black;
  flex-basis: 45%;
`;

const OutfitPicture = props => {
  const { intl } = props;
  const { formatMessage } = intl;
  return (
    <OutfitCard className="PictureBox">
      <Header
        cardName={formatMessage({
          id: `cardTitles.picture`,
          defaultMessage: `Clothing picture`
        })}
      />
      <Content cardContent={<Fragment />} />
    </OutfitCard>
  );
};

export default injectIntl(OutfitPicture);
