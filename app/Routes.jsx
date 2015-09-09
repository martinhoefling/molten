var React = require('react'),
    Router = require('react-router'),
    Route = Router.Route,
    DefaultRoute = Router.DefaultRoute;

var Main = require('containers/Main');
var Login = require('components/Login');
var ExecuteTab = require('containers/tabs/ExecuteTab');
var JobsTab = require('containers/tabs/JobsTab');
var MinionsTab = require('containers/tabs/MinionsTab');
var EventsTab = require('containers/tabs/EventsTab');
var SettingsTab = require('containers/tabs/SettingsTab');

module.exports = (
    <Route handler={Main} name='home' path='/'>
        <Route handler={Login} name='login' path='login' />
        <Route handler={ExecuteTab} name='execute' path='execute' />
        <Route handler={JobsTab} name='jobs' path='jobs' />
        <Route handler={MinionsTab} name='minions' path='minion' />
        <Route handler={EventsTab} name='events' path='events' />
        <Route handler={SettingsTab} name='settings' path='settings' />
        <DefaultRoute handler={ExecuteTab} />
    </Route>
);

