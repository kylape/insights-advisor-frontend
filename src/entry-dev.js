/* eslint-disable no-console */
import App from './App';
import { IntlProvider } from '@redhat-cloud-services/frontend-components-translations';
import { NotificationsPortal } from '@redhat-cloud-services/frontend-components-notifications';
import { Provider } from 'react-redux';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { init } from './Store';
import logger from 'redux-logger';
import messages from '../locales/data.json';
import { render, unmountComponentAtNode } from 'react-dom';
import { initializeApp } from '@scalprum/core';

// const url = new URL(document.currentScript.src);
// eslint-disable-next-line no-undef
// __webpack_public_path__ = `${url.origin}/${__webpack_public_path__}`;

console.log('ADVISOR DEV');

initializeApp({
    id: 'advisor',
    name: 'advisor',
    unmount: () => unmountComponentAtNode(document.getElementById('advisor-root')),
    update: console.log,
    mount: () => render(
        <IntlProvider locale={navigator.language.slice(0, 2)} messages={messages} onError={console.log}>
            <Provider store={init(logger).getStore()}>
                <Router basename="/insights/advisor/foo">
                    <React.Fragment>
                        <NotificationsPortal />
                        <App />
                    </React.Fragment>
                </Router>
            </Provider>
        </IntlProvider>,
        document.getElementById('advisor-root')
    )
});
