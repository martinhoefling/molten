import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Switch, Redirect, Route } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';

import Main from 'containers/Main';

import Constants from 'Constants';

import Theme from 'Theme';
import store from 'store';
import { browserHistory } from 'store';

import keymap from 'keymap';
import { ShortcutManager } from 'react-shortcuts';

import DevTools from './DevTools';

const shortcutManager = new ShortcutManager(keymap);

const Root = createReactClass({
    displayName: 'Root',

    childContextTypes: {
        shortcuts: PropTypes.object.isRequired
    },

    getChildContext: function () {
        return {
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
            <Theme>
                <Provider store={store}>
                    <div>
                        <ConnectedRouter history={browserHistory}>
                            <Switch>
                                <Route path={Constants.URL.ROOT} component={Main}/>
                                <Redirect from='*' to={Constants.URL.ROOT} />
                            </Switch>
                        </ConnectedRouter>
                        {this.renderDevTools()}
                    </div>
                </Provider>
            </Theme>
        );
    }
});

export default Root;
