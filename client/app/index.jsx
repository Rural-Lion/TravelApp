import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.jsx';
import { AppContainer } from 'react-hot-loader';

ReactDOM.render(
  <AppContainer>
    <App />
  </AppContainer>,
  document.getElementById('root'),
);

if (module.hot) {
  module.hot.accept('./app.jsx', () => {
    const NewApp = require('./app.jsx').default;
    ReactDOM.render(
      <AppContainer>
        <NewApp />
      </AppContainer>,
      document.getElementById('root'),
    );
  });
}