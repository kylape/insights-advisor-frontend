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
import { initializeApp } from '@scalprum/core';

console.log('ADVISOR DEV');

const Advisor = () => (
    <IntlProvider locale={navigator.language.slice(0, 2)} messages={messages} onError={console.log}>
        <Provider store={init(logger).getStore()}>
            <Router basename="/insights/advisor/foo">
                <React.Fragment>
                    <NotificationsPortal />
                    <App />
                </React.Fragment>
            </Router>
        </Provider>
    </IntlProvider>
);

initializeApp({
    id: 'advisor',
    name: 'advisor',
    unmount: () => console.log('unmounting advisor'),
    update: console.log,
    // eslint-disable-next-line react/display-name
    mount: () => <Advisor />
});
