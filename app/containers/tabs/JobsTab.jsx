var React = require('react');
var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);

var tabStyle = require('./Tab.less');

var JobsTab = React.createClass({
    mixins: [FluxMixin],
    render() {
        return (<div className={tabStyle.this}>jobs tab</div>);
    }
});

module.exports = JobsTab;
