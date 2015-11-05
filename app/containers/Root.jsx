var React = require('react');
var ReduxRouter = require('redux-router').ReduxRouter;
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

var ThemeManager = require('material-ui/lib/styles/theme-manager');
var Theme = require('Theme');
var routes = require('Routes');

var Provider = require('react-redux').Provider;
var store = require('store');

var Root = React.createClass({
    childContextTypes: {
        muiTheme: React.PropTypes.object.isRequired
    },

    getChildContext: function () {
        return {
            muiTheme: ThemeManager.getMuiTheme(Theme)
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

module.exports = Root;
