import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { Switch, Route } from 'react-router';

import Tab from 'material-ui/Tabs/Tab';
import Tabs from 'material-ui/Tabs/Tabs';

import ExecuteHistoryTab from 'containers/tabs/ExecuteHistoryTab';
import ExecuteCommandTab from 'containers/tabs/ExecuteCommandTab';

import Constants from 'Constants';
import config from 'config';

import tabStyle from './Tab.less';

const TABS = [
    {
        name: 'command',
        label: 'Execute Job'

    },
    {
        name: 'history',
        label: 'Execution History'
    }
];

const ExecuteTab = createReactClass({
    displayName: 'ExecuteTab',

    propTypes: {
        match: PropTypes.object.isRequired,
        push: PropTypes.func.isRequired,
        location: PropTypes.object.isRequired
    },

    renderTabs() {
        const tabs = TABS.map((tab) => {
                return <Tab
                    key={tab.name}
                    value={tab.name}
                    onActive={() => this._onActive(tab.name)}
                    label={tab.label}
                />;
            }),
            path = this.props.location.pathname.substring(config.APP_BASE_URL.length + 1),
            tabstr = path.split('/')[1] || '',
            index = Math.max(0, _.findIndex(TABS, tab => tabstr.indexOf(tab.name.toLowerCase()) === 0));

        return (
            <Tabs initialSelectedIndex={index} value={tabstr}>
                {tabs}
            </Tabs>
        );
    },

    _onActive(route) {
        this.props.push(Constants.URL.ROOT + 'execute/' + route);
    },

    renderTabContent() {
        return (
            <Switch>
                <Route component={ExecuteCommandTab} path={`${this.props.match.url}/command`} />
                <Route component={ExecuteHistoryTab} path={`${this.props.match.url}/history`} />
                <Route component={ExecuteCommandTab} path={`${this.props.match.url}/`} />
            </Switch>
        );
    },

    render() {
        return (
            <div className={tabStyle.this}>
                {this.renderTabs()}
                {this.renderTabContent()}
            </div>
        );
    }
});

function select(state) {
    return {
        location: state.router.location
    };
}

export default connect(select, { push })(ExecuteTab);

