// module "MainWeatherInfo.js"
import React, { Fragment } from 'react';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';

const MainWeather = styled.div`
  padding: 0.5em;
  flex-basis: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TempBox = styled.div`
  font-size: 3em;
  margin-right: 0.5em;
`;

const DescriptionBox = styled.div`
  font-size: 1.5em;
  display: flex;
  flex-direction: column;
`;

const MainWeatherInfo = props => {
  const { intl } = props;
  const { mainPanelData } = props;
  /* const { icon, temp, main, description } = mainPanelData; */

  return (
    <MainWeather className="MainWeatherInfo">
      {mainPanelData ? (
        <Fragment>
          <TempBox>
            {Math.round(props.mainPanelData.temp) +
              intl.formatMessage({
                id: `additions.temp`,
                defaultMessage: ` °C`
              })}
          </TempBox>
          <DescriptionBox>
            <div>{props.mainPanelData.main}</div>
            <div>{props.mainPanelData.description}</div>
          </DescriptionBox>
        </Fragment>
      ) : null}
    </MainWeather>
  );
};

export default injectIntl(MainWeatherInfo);
