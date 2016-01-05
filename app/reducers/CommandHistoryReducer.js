import _ from 'lodash';
import Constants from 'Constants';

const initialState = [];

export default function commandHistoryReducer(state = initialState, action) {
    switch (action.type) {
        case Constants.STORE_COMMAND:
            var index = state.findIndex(function (storedCommand) {
                var stored = _.omit(storedCommand, ['timestamps']);
                var command = _.pick(action, ['clientConfig', 'targetConfig', 'functionConfig']);
                return _.isEqual(stored, command);
            });
            if (index < 0) {
                return [...state.slice(), {
                    timestamps: [action.timestamp],
                    clientConfig: action.clientConfig,
                    targetConfig: action.targetConfig,
                    functionConfig: action.functionConfig
                }];
            }
            var newState = state.slice();
            var timestamps = [...newState[index].timestamps.slice(), action.timestamp];
            newState[index] = Object.assign({}, newState[index], { timestamps });
            return newState;
        default:
            return state;
    }
}
