var React = require('react');
var injectTapEventPlugin = require('react-tap-event-plugin');

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

var Fluxxor = require('fluxxor');

var Main = require('containers/Main');
var SessionStore = require('stores/SessionStore');
var CapabilityStore = require('stores/CapabilityStore');
var CommandStore = require('stores/CommandStore');
var EventStore = require('stores/EventStore');
var DocumentationStore = require('stores/DocumentationStore');
var RoutingStore = require('stores/RoutingStore');

var Router = require('react-router');
var routes = require('Routes');
var router = Router.create({ routes: routes });

var stores = {
    SessionStore: new SessionStore(),
    CapabilityStore: new CapabilityStore(),
    CommandStore: new CommandStore(),
    EventStore: new EventStore(),
    DocumentationStore: new DocumentationStore(),
    RoutingStore: new RoutingStore({ router: router })
};

var actions = require('Actions');
var flux = new Fluxxor.Flux(stores, actions);
window.flux = flux;

flux.on('dispatch', function (type, payload) {
    if (console && console.log) {
        console.log('[Dispatch]', type, payload);
    }
});

// Needed for React Developer Tools
window.React = React;

flux.actions.testSessionStatus();

router.run(function (Handler) {
    React.render(
        <Handler flux={flux} />,
        document.getElementById('content')
    );
});
