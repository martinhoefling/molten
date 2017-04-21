import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import Tab from 'material-ui/Tabs/Tab';
import Tabs from 'material-ui/Tabs/Tabs';

import { testSessionStatus, logout } from 'ActionCreators';
import MaterialButton from 'elements/MaterialButton';
import Constants from 'Constants';
import config from 'config';

import styles from './TabHeaders.less';

const TABS = ['Execute', 'Job', 'Minion', 'Event', 'Settings'];

const TabHeaders = createReactClass({
    displayName: 'TabHeaders',

    propTypes: {
        currentSession: PropTypes.object,
        testSessionStatus: PropTypes.func.isRequired,
        logout: PropTypes.func.isRequired,
        push: PropTypes.func.isRequired,
        location: PropTypes.object.isRequired
    },

    componentWillMount() {
        if (!this.props.currentSession) {
            this.props.testSessionStatus();
        }
    },

    logout() {
        this.props.logout();
    },

    renderTabs() {
        var tabs = TABS.map(function (name) {
            return (
                <Tab
                    label={name}
                    key={name}
                    onActive={() => this._onActive(name.toLowerCase())} />
            );
        }, this);

        var path = this.props.location.pathname.substring(config.APP_BASE_URL.length + 1),
            tabstr = path.split('/')[0],
            index = Math.max(0, _.findIndex(TABS, tab => tabstr.indexOf(tab.toLowerCase()) === 0));

        return (
            <Tabs initialSelectedIndex={index}>
                {tabs}
            </Tabs>
        );
    },

    _onActive(route) {
        if (this.props.currentSession) {
            this.props.push(Constants.URL.ROOT + route);
        } else {
            this.props.push(Constants.URL.LOGIN);
        }
    },

    render() {
        return (
            <div className={styles.this}>
                <div className={styles.tabs}>
                    {this.renderTabs()}
                </div>
                <div className={styles.buttons}>
                    <MaterialButton
                        title='logout'
                        iconClass='cancel'
                        onClick={this.logout}/>
                    <a href='https://github.com/martinhoefling/molten'>
                        <img title='open on github'
                             className={styles.github}
                             src={config.ASSET_BASE_URL + '/contrib/github.svg'}/>
                    </a>
                </div>
            </div>
        );
    }
});

function select(state) {
    return {
        currentSession: state.Session.session,
        location: state.router.location
    };
}

export default connect(select, { testSessionStatus, logout, push })(TabHeaders);
