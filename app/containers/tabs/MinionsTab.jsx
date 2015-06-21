var React = require('react');
var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);

var tabStyle = require('./Tab.css');

var MinionsTab = React.createClass({
    mixins: [FluxMixin],
    render() {
        return (<div>minions tab</div>);
    }
});

module.exports = MinionsTab;
