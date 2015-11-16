var Constants = require('Constants');
var _s = require('underscore.string');

const initialState = {
    documentation: {},
    error: null,
    inProgress: false
};

function documentationReducer(state = initialState, action) {
    switch (action.type) {
        case Constants.GET_DOCUMENTATION:
            return {
                documentation: Object.assign({}, state.documentation, { [action.docType]: null }),
                error: null,
                inProgress: Object.assign({}, state.inProgress, { [action.docType]: true })
            };
        case Constants.GET_DOCUMENTATION_SUCCESS:
            return {
                documentation: Object.assign(
                    {}, state.documentation,
                    { [action.docType]: _parseDocumentation(action.documentation.return[0]) }),
                error: null,
                inProgress: Object.assign({}, state.inProgress, { [action.docType]: false })
            };
        case Constants.GET_DOCUMENTATION_FAIL:
            return {
                documentation: Object.assign({}, state.documentation, { [action.docType]: null }),
                error,
                inProgress: Object.assign({}, state.inProgress, { [action.docType]: false })
            };
        default:
            return state;
    }
}

function _parseDocumentation(raw) {
    var parsed = {};
    for (var prop in raw) {
        var doc = raw[prop];
        parsed[prop] = _s.strip(doc);
    }
    return parsed;
}

module.exports = documentationReducer;

