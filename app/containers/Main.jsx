import React from 'react';
import PropTypes from 'prop-types';

import { Switch, Route } from 'react-router';

import Login from 'components/Login';
import ExecuteTab from 'containers/tabs/ExecuteTab';
import JobsTab from 'containers/tabs/JobsTab';
import DetailedJobTab from 'containers/tabs/DetailedJobTab';
import MinionsTab from 'containers/tabs/MinionsTab';
import EventsTab from 'containers/tabs/EventsTab';
import SettingsTab from 'containers/tabs/SettingsTab';
import EventListener from 'containers/EventListener';
import Toast from 'containers/Toast';
import TabHeaders from 'components/TabHeaders';

import styles from './Main.less';

class Main extends React.Component {
    render() {
        return (
            <div className={styles.this}>
                <TabHeaders/>
                <Switch>
                    <Route exact component={Login} path={`${this.props.match.url}/login`} />
                    <Route exact component={ExecuteTab} path={`${this.props.match.url}/execute`}/>
                    <Route exact component={JobsTab} path={`${this.props.match.url}/job`} />
                    <Route component={DetailedJobTab} path={`${this.props.match.url}/job/:jid`} />
                    <Route exact component={MinionsTab} path={`${this.props.match.url}/minion`} />
                    <Route exact component={EventsTab} path={`${this.props.match.url}/event`} />
                    <Route exact component={SettingsTab} path={`${this.props.match.url}/settings`} />
                    <Route exact component={ExecuteTab} path={`${this.props.match.url}/`} />
                </Switch>
                <EventListener/>
                <Toast/>
            </div>
        );
    }
}

Main.propTypes = {
    match: PropTypes.object.isRequired
};

export default Main;
