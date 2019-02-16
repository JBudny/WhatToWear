import React from 'react';
import { FormattedMessage } from 'react-intl';
import './css/App.css';
import Container from './Container';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">
          <FormattedMessage
            id="app.title"
            defaultMessage="Welcome to {what}"
            description="Welcome header on app main page"
            values={{ what: 'WhatToWear' }}
          />
        </h1>
      </header>
      <Container />
    </div>
  );
};

export default App;
