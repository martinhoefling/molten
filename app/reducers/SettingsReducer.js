import Constants from 'Constants';
import _ from 'lodash';

const initialState = {};

export default function sessionReducer(state = initialState, action) {
    switch (action.type) {
        case Constants.SET_SETTING:
            return Object.assign({}, state, { [action.setting]: action.value });
        case Constants.CLEAR_SETTING:
            return _.omit(state, action.setting);
        default:
            return state;
    }
}

