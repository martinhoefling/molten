import React from 'react';
import Tab from 'material-ui/lib/tabs/tab';
import Tabs from 'material-ui/lib/tabs/tabs';

import ExecuteHistoryTab from 'containers/tabs/ExecuteHistoryTab';
import ExecuteCommandTab from 'containers/tabs/ExecuteCommandTab';

import tabStyle from './Tab.less';

const ExecuteTab = React.createClass({

    render() {
        return (
            <Tabs className={tabStyle.this}>
                <Tab label='Execute Job' >
                    <ExecuteCommandTab/>
                </Tab>
                <Tab label='Execution History' >
                    <ExecuteHistoryTab/>
                </Tab>
            </Tabs>
        );
    }
});

export default ExecuteTab;
