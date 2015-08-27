var React = require('react');
var _ = require('lodash');
var Fluxxor = require('fluxxor');
var RaisedButton = require('material-ui/lib/raised-button');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;
var Event = require('components/events/Event');
var tabStyle = require('./Tab.less');

var EventsTab = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('EventStore')],

    getStateFromFlux: function () {
        var flux = this.getFlux();
        var events = flux.stores.EventStore.getEvents();
        return {
            events
        };
    },

    clearEvents() {
        this.getFlux().actions.clearEvents();
    },

    renderHeader() {
        return (
            <div>
                <RaisedButton
                    disabled={!this.state.events.length}
                    label='Clear Events'
                    primary={true}
                    onClick={this.clearEvents}
                    />
            </div>
        );
    },

    renderEvents() {
        var eventComponents = this.state.events.map(function (event, ndx) {
            return (
                <Event key={ndx}
                       event={event}/>
            );
        });
        return (<div>{eventComponents}</div>);
    },

    render() {
        return (
            <div>
                {this.renderHeader()}
                {this.renderEvents()}
            </div>
        );
    }
});

module.exports = EventsTab;
