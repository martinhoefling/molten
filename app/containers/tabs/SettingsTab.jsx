var React = require('react');
var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);

var tabStyle = require('./Tab.css');

var SettingsTab = React.createClass({
    mixins: [FluxMixin],
    render() {
        return (<div>settings tab</div>);
    }
});

module.exports = SettingsTab;
