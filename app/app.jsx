var React = require('react');
var injectTapEventPlugin = require('react-tap-event-plugin');

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

var Router = require('react-router').Router;
var createBrowserHistory = require('history/lib/createBrowserHistory');
var history = createBrowserHistory();

var Session = require('reducers/SessionReducer');
var Capabilities = require('reducers/CapabilityReducer');
var Commands = require('reducers/CommandReducer');
var Events = require('reducers/EventReducer');
var Jobs = require('reducers/JobReducer');
var Documentation = require('reducers/DocumentationReducer');
var Minions = require('reducers/MinionReducer');

var combineReducers = require('redux').combineReducers;
var reducers = combineReducers({ Session, Capabilities, Commands, Events, Jobs, Documentation, Minions });

var createStore = require('redux').createStore;
var applyMiddleware = require('redux').applyMiddleware;
var Thunk = require('redux-thunk');
var createLogger = require('redux-logger');

var logger = createLogger();
var createStoreWithMiddleware = applyMiddleware(Thunk, logger)(createStore);

var store = createStoreWithMiddleware(reducers);

// Needed for React Developer Tools
window.React = React;

var routes = require('Routes');
var ThemeManager = require('material-ui/lib/styles/theme-manager');
var Theme = require('Theme');
var Provider = require('react-redux').Provider;

function createElement(Component, props) {
    var WrapperComponent = React.createClass({
        childContextTypes: {
            muiTheme: React.PropTypes.object.isRequired
        },

        getChildContext: function () {
            return {
                muiTheme: ThemeManager.getMuiTheme(Theme)
            };
        },

        render() {
            return (
                <Provider store={store}>
                    <Component {...props}/>
                </Provider>
            );
        }
    });

    return <WrapperComponent/>;
}

React.render(
    <Router routes={routes} history={history} createElement={createElement}/>,
    document.getElementById('content')
);
