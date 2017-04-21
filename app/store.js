import { combineReducers, compose, createStore, applyMiddleware } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';

import Thunk from 'redux-thunk';

import Session from 'reducers/SessionReducer';
import Capabilities from 'reducers/CapabilityReducer';
import Commands from 'reducers/CommandReducer';
import CommandHistory from 'reducers/CommandHistoryReducer';
import Events from 'reducers/EventReducer';
import Jobs from 'reducers/JobReducer';
import Documentation from 'reducers/DocumentationReducer';
import Minions from 'reducers/MinionReducer';
import Settings from 'reducers/SettingsReducer';
import DevTools from 'containers/DevTools';

import {persistStore, autoRehydrate} from 'redux-persist';
import createBrowserHistory from 'history/createBrowserHistory';

export const browserHistory = createBrowserHistory();

const reducers = combineReducers({
    Session, Capabilities, Commands, CommandHistory, Events, Jobs, Documentation, Minions, Settings
});

var middlewares = [
    Thunk,
    routerMiddleware(browserHistory)
];

if (process.env.NODE_ENV !== 'production') {
    var LoggerFactory = require('redux-logger');
    var logger = LoggerFactory.createLogger();
    middlewares.push(logger);
}

var composers = [
    autoRehydrate(),
    applyMiddleware(...middlewares)
];

if (process.env.NODE_ENV !== 'production') {
    composers.push(DevTools.instrument());
}
// Compose reduxReactRouter with other store enhancers
const store = compose(
    ... composers
)(createStore)(connectRouter(browserHistory)(reducers));

persistStore(store, { whitelist: ['Commands', 'CommandHistory', 'Settings'] });

export default store;
