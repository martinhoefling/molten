import React from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';

import Tab from 'material-ui/lib/tabs/tab';
import Tabs from 'material-ui/lib/tabs/tabs';

import { testSessionStatus, logout } from 'ActionCreators';
import MaterialButton from 'elements/MaterialButton';
import Constants from 'Constants';
import config from 'config';

import styles from './TabHeaders.less';

const TABS = ['Execute', 'Job', 'Minion', 'Event', 'Settings'];

const TabHeaders = React.createClass({
    propTypes: {
        currentSession: React.PropTypes.object,
        testSessionStatus: React.PropTypes.func.isRequired,
        logout: React.PropTypes.func.isRequired,
        pushState: React.PropTypes.func.isRequired,
        location: React.PropTypes.object.isRequired
    },

    getInitialState() {
        return {
            activeTab: 'execution'
        };
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
                    route={name.toLowerCase()}
                    onActive={this._onActive} />
            );
        }, this);

        var path = this.props.location.pathname.substring(config.APP_BASE_URL.length + 1),
            index = Math.max(0, _.findIndex(TABS, tab => path.indexOf(tab.toLowerCase()) === 0));

        return (
            <Tabs initialSelectedIndex={index}>
                {tabs}
            </Tabs>
        );
    },

    _onActive(tab) {
        if (this.props.currentSession) {
            this.props.pushState(null, Constants.URL.ROOT + tab.props.route);
        } else {
            this.props.pushState(null, Constants.URL.LOGIN);
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

export default connect(select, { testSessionStatus, logout, pushState })(TabHeaders);
