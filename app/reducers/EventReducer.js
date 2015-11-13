var Constants = require('Constants');

const initialState = {
    events: []
};

function _parseRaw(rawEvent) {
    var parsedRawData = JSON.parse(rawEvent.data);
    var event = {};
    event.timestamp = new Date(rawEvent.timeStamp);
    event.data = parsedRawData.data;
    event.tag = parsedRawData.tag;
    return event;
}

function capabilityReducer(state = initialState, action) {
    switch (action.type) {
        case Constants.SERVER_EVENT_RECEIVED:
            return { events: [...state.events.slice(), _parseRaw(action.event)] };
        case Constants.CLEAR_EVENTS:
            return { events: [] };
        default:
            return state;
    }
}

module.exports = capabilityReducer;


