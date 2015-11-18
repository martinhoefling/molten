import React from 'react';
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

import Theme from 'Theme';
import routes from 'Routes';
import store from 'store';

const Root = React.createClass({
    childContextTypes: {
        muiTheme: React.PropTypes.object.isRequired
    },

    getChildContext: function () {
        return {
            muiTheme: Theme
        };
    },

    render() {
        return (
            <div>
                <Provider store={store}>
                    <ReduxRouter routes={routes}/>
                </Provider>
                <DebugPanel top right bottom>
                    <DevTools store={store} monitor={LogMonitor} />
                </DebugPanel>
            </div>
        );
    }
});

export default Root;
