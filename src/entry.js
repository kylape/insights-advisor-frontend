/* eslint-disable no-console */
import App from './App';
import { IntlProvider } from '@redhat-cloud-services/frontend-components-translations';
import { NotificationsPortal } from '@redhat-cloud-services/frontend-components-notifications';
import { Provider } from 'react-redux';
import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { init } from './Store';
import messages from '../locales/data.json';
import { initializeApp } from '@scalprum/core';

initializeApp({
    id: 'advisor',
    name: 'advisor',
    unmount: () => unmountComponentAtNode(document.getElementById('advisor-root')),
    update: console.log,
    mount: () => render(
        <IntlProvider locale={navigator.language.slice(0, 2)} messages={messages} onError={console.log}>
            <Provider store={init().getStore()}>
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
