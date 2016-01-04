import Constants from 'Constants';

const initialState = {
    lowstate: null,
    result: null,
    error: null,
    inProgress: false,
    clientConfig: { client: 'local' },
    targetConfig: { tgt: '*' },
    functionConfig: { fun: 'grains.items' }
};

export default function commandReducer(state = initialState, action) {
    switch (action.type) {
        case Constants.SUBMIT_COMMAND:
            return Object.assign({}, state,
                { lowstate: action.commandObj, result: null, error: null, inProgress: true });
        case Constants.SUBMIT_COMMAND_SUCCESS:
            return Object.assign({}, state,
                { lowstate: action.commandObj, result: action.result, error: null, inProgress: false });
        case Constants.SUBMIT_COMMAND_FAIL:
            return Object.assign({}, state,
                { lowstate: action.commandObj, result: null, error: action.error, inProgress: false });
        case Constants.SET_CLIENT_CONFIGURATION:
            return Object.assign({}, state, { clientConfig: action.config });
        case Constants.SET_TARGET_CONFIGURATION:
            return Object.assign({}, state, { targetConfig: action.config });
        case Constants.SET_FUNCTION_CONFIGURATION:
            return Object.assign({}, state, { functionConfig: action.config });
        default:
            return state;
    }
}
