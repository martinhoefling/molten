import React from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';

import Tab from 'material-ui/lib/tabs/tab';
import Tabs from 'material-ui/lib/tabs/tabs';

import Constants from 'Constants';
import config from 'config';

import tabStyle from './Tab.less';

const TABS = ['command', 'history'];

const ExecuteTab = React.createClass({
    propTypes: {
        pushState: React.PropTypes.func.isRequired,
        location: React.PropTypes.object.isRequired
    },

    renderTabs() {
        var path = this.props.location.pathname.substring(config.APP_BASE_URL.length + 1),
        tabstr = path.split('/')[1],
        index = Math.max(0, _.findIndex(TABS, tab => tabstr.indexOf(tab.toLowerCase()) === 0));
        return (
            <Tabs initialSelectedIndex={index}>
                <Tab
                    route='command'
                    onActive={this._onActive}
                    label='Execute Job'
                />
                <Tab
                    route='history'
                    onActive={this._onActive}
                    label='Execution History'
                />
            </Tabs>
        );
    },

    _onActive(tab) {
        this.props.pushState(null, Constants.URL.ROOT + 'execute/' + tab.props.route);
    },

    render() {
        return (
            <div className={tabStyle.this}>
                {this.renderTabs()}
                {this.props.children}
            </div>
        );
    }
});

function select(state) {
    return {
        location: state.router.location
    };
}

export default connect(select, { pushState })(ExecuteTab);
