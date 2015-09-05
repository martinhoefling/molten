var React = require('react');
var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;
var LoadingIndicator = require('elements/LoadingIndicator');

var Minion = require('components/minions/Minion');

var tabStyle = require('./Tab.less');

var MinionsTab = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('MinionStore')],

    getStateFromFlux() {
        var flux = this.getFlux();
        var minionStore = flux.stores.MinionStore;
        var minions = minionStore.getMinions();
        return {
            minions,
            fetchInProgress: minionStore.fetchingMinionsInProgress()
        };
    },

    renderMinions() {
        return this.state.minions.map(minion => <Minion key={minion.id} minion={minion}/>);
    },

    render() {
        if (this.state.fetchInProgress) {
            return (
                <LoadingIndicator>
                    Loading Minions
                </LoadingIndicator>
            );
        }
        return (
            <div className={tabStyle.this}>
                {this.renderMinions()}
            </div>
        );
    }
});

module.exports = MinionsTab;
