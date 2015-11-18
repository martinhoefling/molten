import Constants from 'Constants';

const initialState = {
    minions: {},
    fetchingMinionsInProgress: false,
    minionsBeingFetched: {}
};

export default function minionReducer(state = initialState, action) {
    switch (action.type) {
        case Constants.GET_MINIONS:
            return Object.assign({}, state, { fetchingMinionsInProgress: true });
        case Constants.GET_MINIONS_SUCCESS:
            return Object.assign({}, state, { minions: action.minionList.return[0], fetchingMinionsInProgress: false });
        case Constants.GET_MINION:
            return Object.assign(
                {},
                state,
                { minionsBeingFetched: Object.assign({}, state.minionsBeingFetched, { [action.minionId]: true }) }
            );
        case Constants.GET_MINION_SUCCESS:
            return Object.assign(
                {},
                state,
                {
                    minionsBeingFetched: Object.assign({}, state.minionsBeingFetched, { [action.minionId]: false }),
                    minions: Object.assign({}, state.minions, { [action.minionId]: action.minion })
                }
            );
        default:
            return state;
    }
}
