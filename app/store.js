import { combineReducers, compose, createStore, applyMiddleware } from 'redux';
import { routerStateReducer, reduxReactRouter } from 'redux-router';
import Thunk from 'redux-thunk';
import createHistory from 'history/lib/createBrowserHistory';
import createLogger from 'redux-logger';

import Session from 'reducers/SessionReducer';
import Capabilities from 'reducers/CapabilityReducer';
import Commands from 'reducers/CommandReducer';
import CommandHistory from 'reducers/CommandHistoryReducer';
import Events from 'reducers/EventReducer';
import Jobs from 'reducers/JobReducer';
import Documentation from 'reducers/DocumentationReducer';
import Minions from 'reducers/MinionReducer';
import Settings from 'reducers/SettingsReducer';
import routes from 'Routes';
import DevTools from 'containers/DevTools';
import {persistStore, autoRehydrate} from 'redux-persist';

const reducers = combineReducers({
    Session, Capabilities, Commands, CommandHistory, Events, Jobs, Documentation, Minions, Settings,
    router: routerStateReducer
});

const logger = createLogger();

// Compose reduxReactRouter with other store enhancers
const store = compose(
    autoRehydrate(),
    applyMiddleware(Thunk, logger),
    reduxReactRouter({
        routes,
        createHistory
    }),
    DevTools.instrument()
)(createStore)(reducers);

persistStore(store, { whitelist: ['Commands', 'CommandHistory', 'Settings'] });

export default store;
