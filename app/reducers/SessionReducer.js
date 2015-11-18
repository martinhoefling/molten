import Constants from 'Constants';

const initialState = {
    session: null,
    error: null,
    inProgress: false
};

export default function sessionReducer(state = initialState, action) {
    switch (action.type) {
        case Constants.SET_SESSION:
            return { session: null, error: null, inProgress: true };
        case Constants.SET_SESSION_SUCCESS:
            return { session: action.session, error: null, inProgress: false };
        case Constants.SET_SESSION_FAIL:
            return { session: null, error: action.error, inProgress: false };
        case Constants.UNSET_SESSION:
            return { session: null, error: null, inProgress: true };
        case Constants.UNSET_SESSION_FAIL:
            return { session: null, error: action.error, inProgress: false };
        case Constants.UNSET_SESSION_SUCCESS:
            return { session: null, error: null, inProgress: false };
        default:
            return state;
    }
}

