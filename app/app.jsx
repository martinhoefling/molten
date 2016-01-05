// required for Object.assign
import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Root from 'containers/Root';

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

// Needed for React Developer Tools
window.React = React;

ReactDOM.render(
    <Root/>,
    document.getElementById('content')
);
