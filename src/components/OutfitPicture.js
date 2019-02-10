// module "OutfitPicture.js"
import React, {Fragment} from 'react'
import Card from './Card'
import uiStrings from './data/stringsEN'

const OutfitPicture =() => {
  return (
    <Card cardName={uiStrings.cardTitles.picture}
          cardContent=
          {
            <Fragment />
          }/>
  )
}

export default OutfitPicture;
