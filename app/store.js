var Session = require('reducers/SessionReducer');
var Capabilities = require('reducers/CapabilityReducer');
var Commands = require('reducers/CommandReducer');
var Events = require('reducers/EventReducer');
var Jobs = require('reducers/JobReducer');
var Documentation = require('reducers/DocumentationReducer');
var Minions = require('reducers/MinionReducer');

var routerStateReducer = require('redux-router').routerStateReducer;
var reduxReactRouter = require('redux-router').reduxReactRouter;
var createHistory = require('history/lib/createBrowserHistory');

var combineReducers = require('redux').combineReducers;
var reducers = combineReducers({
    Session, Capabilities, Commands, Events, Jobs, Documentation, Minions,
    router: routerStateReducer
});

var routes = require('Routes');
var compose = require('redux').compose;

var createStore = require('redux').createStore;
var applyMiddleware = require('redux').applyMiddleware;

var Thunk = require('redux-thunk');

var createLogger = require('redux-logger');
var logger = createLogger();

var devTools = require('redux-devtools').devTools;

// Compose reduxReactRouter with other store enhancers
var store = compose(
    applyMiddleware(Thunk, logger),
    reduxReactRouter({
        routes,
        createHistory
    }),
    devTools()
)(createStore)(reducers);

module.exports = store;
