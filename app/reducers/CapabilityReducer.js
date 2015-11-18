import Constants from 'Constants';

const initialState = {
    capabilities: null,
    error: null,
    inProgress: false
};

export default function capabilityReducer(state = initialState, action) {
    switch (action.type) {
        case Constants.GET_CAPABILITIES:
            return { capabilities: null, error: null, inProgress: true };
        case Constants.GET_CAPABILITIES_SUCCESS:
            return { capabilities: action.capabilities, error: null, inProgress: false };
        case Constants.GET_CAPABILITIES_FAIL:
            return { capabilities: null, error: action.error, inProgress: false };
        default:
            return state;
    }
}
