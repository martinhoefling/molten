import Constants from 'Constants';

const initialState = {
    lowstate: null,
    result: null,
    error: null,
    inProgress: false
};

export default function commandReducer(state = initialState, action) {
    switch (action.type) {
        case Constants.SUBMIT_COMMAND:
            return { lowstate: action.commandObj, result: null, error: null, inProgress: true };
        case Constants.SUBMIT_COMMAND_SUCCESS:
            return { lowstate: action.commandObj, result: action.result, error: null, inProgress: false };
        case Constants.SUBMIT_COMMAND_FAIL:
            return { lowstate: action.commandObj, result: null, error: action.error, inProgress: false };
        default:
            return state;
    }
}
