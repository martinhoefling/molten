var React = require('react');
var injectTapEventPlugin = require('react-tap-event-plugin');

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

var Fluxxor = require('fluxxor');
var actions = require('Actions');

var SessionStore = require('stores/SessionStore');
var CapabilityStore = require('stores/CapabilityStore');
var CommandStore = require('stores/CommandStore');
var EventStore = require('stores/EventStore');
var JobStore = require('stores/JobStore');
var DocumentationStore = require('stores/DocumentationStore');
var RoutingStore = require('stores/RoutingStore');
var MinionStore = require('stores/MinionStore');

var Router = require('react-router').Router;
var createBrowserHistory = require('history/lib/createBrowserHistory');
var history = createBrowserHistory();

var stores = {
    SessionStore: new SessionStore(),
    CapabilityStore: new CapabilityStore(),
    CommandStore: new CommandStore(),
    DocumentationStore: new DocumentationStore(),
    EventStore: new EventStore(),
    JobStore: new JobStore(),
    MinionStore: new MinionStore(),
    RoutingStore: new RoutingStore({ history })
};

var flux = new Fluxxor.Flux(stores, actions);
window.flux = flux;

flux.on('dispatch', function (type, payload) {
    if (console && console.log) {
        console.log('[Dispatch]', type, payload);
    }
});

// Needed for React Developer Tools
window.React = React;

var routes = require('Routes');
var ThemeManager = require('material-ui/lib/styles/theme-manager');
var Theme = require('Theme');

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
            return <Component flux={flux} {...props}/>;
        }
    });

    return <WrapperComponent/>;
}

React.render(
    <Router routes={routes} history={history} createElement={createElement}/>,
    document.getElementById('content')
);
