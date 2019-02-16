// module "OutfitPicture.js"
import React, { Fragment } from 'react';
import { injectIntl } from 'react-intl';
import Card from './Card';

const OutfitPicture = props => {
  const { intl } = props;
  const { formatMessage } = intl;
  return (
    <Card
      cardName={formatMessage({ id: 'cardTitles.picture' })}
      cardContent={<Fragment />}
    />
  );
};

export default injectIntl(OutfitPicture);
