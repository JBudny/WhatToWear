import React from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider, addLocaleData } from 'react-intl';
import localeEn from 'react-intl/locale-data/en';
import localePl from 'react-intl/locale-data/pl';
import localeJa from 'react-intl/locale-data/ja';
import messagesEn from './translations/en.json';
import messagesPl from './translations/pl.json';
import messagesJa from './translations/ja.json';
import registerServiceWorker from './registerServiceWorker';
import App from './components/App';

const messages = {
  en: messagesEn,
  pl: messagesPl,
  ja: messagesJa
};
const language = navigator.language.split(/[-_]/)[0];

addLocaleData([...localeEn, ...localePl, ...localeJa]);

ReactDOM.render(
  <IntlProvider locale={language} messages={messages[language]}>
    <App getIntlMessages={() => messages[language]} />
  </IntlProvider>,
  document.getElementById('root')
);

registerServiceWorker();
