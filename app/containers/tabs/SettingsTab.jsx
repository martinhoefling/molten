import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';

import localStore from 'helpers/localstore';

import tabStyle from './Tab.less';

const SettingsTab = React.createClass({
    render() {
        return (
            <div className={tabStyle.this}>
                <RaisedButton
                    label='Clear local storage'
                    primary={true}
                    onClick={() => localStore.clear() }
                />
            </div>
        );
    }
});

export default SettingsTab;
