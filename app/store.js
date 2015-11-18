import { combineReducers, compose, createStore, applyMiddleware } from 'redux';
import { routerStateReducer, reduxReactRouter } from 'redux-router';
import Thunk from 'redux-thunk';
import createHistory from 'history/lib/createBrowserHistory';
import createLogger from 'redux-logger';
import { devTools } from 'redux-devtools';

import Session from 'reducers/SessionReducer';
import Capabilities from 'reducers/CapabilityReducer';
import Commands from 'reducers/CommandReducer';
import Events from 'reducers/EventReducer';
import Jobs from 'reducers/JobReducer';
import Documentation from 'reducers/DocumentationReducer';
import Minions from 'reducers/MinionReducer';
import routes from 'Routes';

const reducers = combineReducers({
    Session, Capabilities, Commands, Events, Jobs, Documentation, Minions,
    router: routerStateReducer
});

const logger = createLogger();

// Compose reduxReactRouter with other store enhancers
export default compose(
    applyMiddleware(Thunk, logger),
    reduxReactRouter({
        routes,
        createHistory
    }),
    devTools()
)(createStore)(reducers);
