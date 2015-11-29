import React from 'react';
import { connect } from 'react-redux';
import { setSetting } from 'ActionCreators';

import RaisedButton from 'material-ui/lib/raised-button';
import Checkbox from 'material-ui/lib/checkbox';

import localStore from 'helpers/localstore';

import tabStyle from './Tab.less';

const SettingsTab = React.createClass({
    propTypes: {
        settings: React.PropTypes.object.isRequired,
        setSetting: React.PropTypes.func.isRequired
    },

    render() {
        return (
            <div className={tabStyle.this}>
                <RaisedButton
                    label='Clear local storage'
                    primary={true}
                    onClick={() => localStore.clear() }
                />
                <Checkbox
                    name='displayEventsAsToasts'
                    value='displayEventsAsToasts'
                    label='Display events as Toasts'
                    defaultChecked={this.props.settings.eventsAsToasts}
                    onCheck={(event, checked) => this.props.setSetting('eventsAsToasts', checked)}
                />
            </div>
        );
    }
});

function select(state) {
    return {
        settings: state.Settings
    };
}

export default connect(select, { setSetting })(SettingsTab);
