import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import travelApp from './reducers';
import { AppContainer } from 'react-hot-loader';
import App from './app.jsx';

const store = createStore(travelApp);

ReactDOM.render(
  <AppContainer>
    <Provider store={store}>
      <App />
    </Provider>
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
