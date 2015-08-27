var React = require('react');
var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);

var tabStyle = require('./Tab.less');

var MinionsTab = React.createClass({
    mixins: [FluxMixin],
    render() {
        return (<div className={tabStyle.this}>minions tab</div>);
    }
});

module.exports = MinionsTab;
