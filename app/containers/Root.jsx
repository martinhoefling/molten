import React from 'react';
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';

import Theme from 'Theme';
import routes from 'Routes';
import store from 'store';

import keymap from 'keymap';
import ShortcutsManager from 'react-shortcuts';

import DevTools from './DevTools';

const shortcutManager = new ShortcutsManager(keymap);

const Root = React.createClass({
    childContextTypes: {
        muiTheme: React.PropTypes.object.isRequired,
        shortcuts: React.PropTypes.object.isRequired
    },

    getChildContext: function () {
        return {
            muiTheme: Theme,
            shortcuts: shortcutManager
        };
    },

    renderDevTools() {
        if (process.env.NODE_ENV !== 'production') {
            return <DevTools/>;
        }
        return null;
    },

    render() {
        return (
            <div>
                <Provider store={store}>
                    <div>
                        <ReduxRouter routes={routes}/>
                        {this.renderDevTools}
                    </div>
                </Provider>
            </div>
        );
    }
});

export default Root;
