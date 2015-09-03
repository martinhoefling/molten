var React = require('react');
var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var Minion = require('components/minions/Minion');

var tabStyle = require('./Tab.less');

var MinionsTab = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('MinionStore')],

    getStateFromFlux() {
        var flux = this.getFlux();
        var minions = flux.stores.MinionStore.getMinions();
        return {
            minions
        };
    },

    renderMinions() {
        return this.state.minions.map(minion => <Minion key={minion.id} minion={minion}/>);
    },

    render() {
        return (
            <div className={tabStyle.this}>
                {this.renderMinions()}
            </div>
        );
    }
});

module.exports = MinionsTab;
