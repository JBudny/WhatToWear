import React from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider, addLocaleData } from 'react-intl';
import localeEn from 'react-intl/locale-data/en';
import localePl from 'react-intl/locale-data/pl';
import messagesEn from './translations/en.json';
import messagesPl from './translations/pl.json';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import App from './components/App';

const messages = {
  en: messagesEn,
  pl: messagesPl
};
const language = navigator.language.split(/[-_]/)[0];

addLocaleData([...localeEn, ...localePl]);

ReactDOM.render(
  <IntlProvider locale={language} messages={messages[language]}>
    <App getIntlMessages={() => messages[language]}/>
  </IntlProvider>,
  document.getElementById('root')
);

registerServiceWorker();
