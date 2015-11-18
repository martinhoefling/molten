import React from 'react';
import { Redirect, Route, IndexRoute } from 'react-router';

import Main from 'containers/Main';
import Login from 'components/Login';
import ExecuteTab from 'containers/tabs/ExecuteTab';
import JobsTab from 'containers/tabs/JobsTab';
import DetailedJobTab from 'containers/tabs/DetailedJobTab';
import MinionsTab from 'containers/tabs/MinionsTab';
import EventsTab from 'containers/tabs/EventsTab';
import SettingsTab from 'containers/tabs/SettingsTab';

const Routes = (
    <Route path=''>
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
        <Redirect from='*' to={CONFIG.APP_BASE_URL + '/'} />
    </Route>
);

export default Routes;
