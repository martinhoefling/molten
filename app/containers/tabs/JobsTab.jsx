var React = require('react');
var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);

var tabStyle = require('./Tab.css');

var JobsTab = React.createClass({
    mixins: [FluxMixin],
    render() {
        return (<div>jobs tab</div>);
    }
});

module.exports = JobsTab;
