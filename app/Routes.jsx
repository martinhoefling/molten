var React = require('react'),
    ReactRouter = require('react-router'),
    Route = ReactRouter.Route,
    IndexRoute = ReactRouter.IndexRoute;

var Main = require('containers/Main');
var Login = require('components/Login');
var ExecuteTab = require('containers/tabs/ExecuteTab');
var JobsTab = require('containers/tabs/JobsTab');
var DetailedJobTab = require('containers/tabs/DetailedJobTab');
var MinionsTab = require('containers/tabs/MinionsTab');
var EventsTab = require('containers/tabs/EventsTab');
var SettingsTab = require('containers/tabs/SettingsTab');

var TabHeaders = require('components/TabHeaders');

module.exports = (
    <Route component={Main} path={CONFIG.APP_BASE_URL}>
        <Route components={{ main: Login }} path='login' />
        <Route components={{ main: ExecuteTab, top: TabHeaders }} path='execute' />
        <Route components={{ main: JobsTab, top: TabHeaders }} path='job' />
        <Route components={{ main: DetailedJobTab, top: TabHeaders }} path='job/:jid' />
        <Route components={{ main: MinionsTab, top: TabHeaders }} path='minion' />
        <Route components={{ main: EventsTab, top: TabHeaders }} path='event' />
        <Route components={{ main: SettingsTab, top: TabHeaders }} path='settings' />
        <IndexRoute components={{ main: ExecuteTab, top: TabHeaders }} />
    </Route>
);

