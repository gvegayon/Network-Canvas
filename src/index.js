import React from 'react';
import ReactDOM from 'react-dom';
import { ready as secureCommsReady } from 'secure-comms-api/cipher';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import { history, store } from './ducks/store';
import { actionCreators } from './ducks/modules/deviceSettings';
import App from './containers/App';
import { isCordova, isElectron } from './utils/Environment';
import AppRouter from './routes';

// This prevents user from being able to drop a file anywhere on the app
document.addEventListener('drop', (e) => {
  e.preventDefault();
  e.stopPropagation();
});
document.addEventListener('dragover', (e) => {
  e.preventDefault();
  e.stopPropagation();
});

const startApp = () => {
  store.dispatch(actionCreators.deviceReady());

  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App>
          <AppRouter />
        </App>
      </ConnectedRouter>
    </Provider>,
    document.getElementById('root'),
  );
};

if (isElectron()) {
  const { webFrame } = require('electron'); // eslint-disable-line global-require
  webFrame.setVisualZoomLevelLimits(1, 1); // Prevents pinch-to-zoom
  webFrame.registerURLSchemeAsPrivileged('asset');
}

secureCommsReady.then(() => {
  if (isCordova()) {
    document.addEventListener('deviceready', startApp, false);
  } else if (document.readyState === 'complete') {
    startApp();
  } else {
    document.onreadystatechange = () => {
      if (document.readyState === 'complete') {
        startApp();
      }
    };
  }
});
