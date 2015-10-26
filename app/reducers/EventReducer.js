var Fluxxor = require('fluxxor');
var Constants = require('Constants');

var EventStore = Fluxxor.createStore({
    initialize() {
        this.events = [];

        this.bindActions(
            Constants.SERVER_EVENT_RECEIVED, this.newEventReceived,
            Constants.CLEAR_EVENTS, this.clearEvents
        );
    },

    newEventReceived(rawEvent) {
        var parsedRawData = JSON.parse(rawEvent.data);
        var event = {};
        event.timestamp = new Date(rawEvent.timeStamp);
        event.data = parsedRawData.data;
        event.tag = parsedRawData.tag;
        this.events.push(event);
        this.emit('change');
    },

    getEvents() {
        return this.events;
    },

    clearEvents() {
        this.events = [];
        this.emit('change');
    }
});

module.exports = EventStore;

