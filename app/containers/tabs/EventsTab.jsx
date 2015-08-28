var React = require('react');
var _ = require('lodash');
var Fluxxor = require('fluxxor');

var RaisedButton = require('material-ui/lib/raised-button');
var TextField = require('material-ui/lib/text-field');

var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var Event = require('components/events/Event');

var tabStyle = require('./Tab.less');
var style = require('./EventsTab.less');

var EventsTab = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('EventStore')],

    getStateFromFlux() {
        var flux = this.getFlux();
        var events = flux.stores.EventStore.getEvents();
        return {
            events
        };
    },

    getInitialState() {
        return {
            tagRegexStr: ''
        };
    },

    clearEvents() {
        this.getFlux().actions.clearEvents();
    },

    renderHeader(events) {
        return (
            <div className={style.header}>
                <RaisedButton
                    disabled={!this.state.events.length}
                    label='Clear Events'
                    primary={true}
                    onClick={this.clearEvents}
                    />
                <TextField
                    hintText='Tag filter regex'
                    floatingLabelText='Tag Filter'
                    onChange={event => this.setState({ tagRegexStr: event.target.value })}
                    />
                <span>{events.length}</span>
            </div>
        );
    },

    renderEvents(events) {
        var eventComponents = this.state.events.map(function (event, ndx) {
            return (
                <Event key={ndx}
                       filtered={!_.contains(events, event)}
                       event={event}/>
            );
        });
        return (<div>{eventComponents}</div>);
    },

    render() {
        var events = this.state.events;
        if (this.state.tagRegexStr.length) {
            var re = new RegExp(this.state.tagRegexStr);
            events = this.state.events.filter(event => re.test(event.tag));
        }
        return (
            <div className={tabStyle.this}>
                {this.renderHeader(events)}
                {this.renderEvents(events)}
            </div>
        );
    }
});

module.exports = EventsTab;
