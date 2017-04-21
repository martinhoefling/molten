import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { setSetting } from 'ActionCreators';

import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';

import tabStyle from './Tab.less';

const SettingsTab = createReactClass({
    displayName: 'SettingsTab',

    propTypes: {
        settings: PropTypes.object.isRequired,
        setSetting: PropTypes.func.isRequired
    },

    render() {
        return (
            <div className={tabStyle.this}>
                <RaisedButton
                    label='Clear local storage'
                    primary={true}
                    onClick={() => _.noop() }
                />
                <Checkbox
                    name='displayEventsAsToasts'
                    value='displayEventsAsToasts'
                    label='Display events as toasts'
                    defaultChecked={this.props.settings.eventsAsToasts}
                    onCheck={(event, checked) => this.props.setSetting('eventsAsToasts', checked)}
                />
                <Checkbox
                    name='displayData'
                    value='displayData'
                    label='Display JSON/YAML data instead of downloading'
                    defaultChecked={this.props.settings.displayData}
                    onCheck={(event, checked) => this.props.setSetting('displayData', checked)}
                />
                <Checkbox
                    name='asYaml'
                    value='asYaml'
                    label='Display/download data as YAML instead of JSON'
                    defaultChecked={this.props.settings.asYaml}
                    onCheck={(event, checked) => this.props.setSetting('asYaml', checked)}
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
