var React = require('react');
var ReactRouter = require('react-router');
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;

var Main = require('containers/Main');
var Login = require('components/Login');
var ExecuteTab = require('containers/tabs/ExecuteTab');
var JobsTab = require('containers/tabs/JobsTab');
var DetailedJobTab = require('containers/tabs/DetailedJobTab');
var MinionsTab = require('containers/tabs/MinionsTab');
var EventsTab = require('containers/tabs/EventsTab');
var SettingsTab = require('containers/tabs/SettingsTab');

module.exports = (
    <Route component={Main} path={CONFIG.APP_BASE_URL + '/'}>
        <Route component={Login} path='login' />
        <Route component={ExecuteTab} path='execute' />
        <Route component={JobsTab} path='job' />
        <Route component={DetailedJobTab} path='job/:jid' />
        <Route component={MinionsTab} path='minion' />
        <Route component={EventsTab} path='event' />
        <Route component={SettingsTab} path='settings' />
        <IndexRoute component={ExecuteTab} />
    </Route>
);

