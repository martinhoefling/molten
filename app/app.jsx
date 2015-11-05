var React = require('react');
var ReactDOM = require('react-dom');
var injectTapEventPlugin = require('react-tap-event-plugin');
var Root = require('containers/Root');

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
