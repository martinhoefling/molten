import commandHistoryReducer from 'reducers/CommandHistoryReducer';
import Constants from 'Constants';

function createStoreAction(clientConfig, targetConfig, functionConfig) {
    var date = new Date();
    return {
        type: Constants.STORE_COMMAND,
        timestamp: date,
        clientConfig,
        targetConfig,
        functionConfig
    };
}

function createDefaultAction() {
    return createStoreAction(
        {
            batch: '10',
            client: 'local_batch'
        },
        {
            tgt: '*'
        },
        {
            fun:'grains.item',
            arg: ['os']
        }
    );
}

describe('CommandHistoryReducer', function () {
    it('Initializes an empty array', function () {
        expect(commandHistoryReducer(undefined, { type: 'invalid' })).toEqual([]);
    });

    it('Stores a single command', function () {
        var action = createDefaultAction();
        var state = commandHistoryReducer(undefined, action);
        expect(state[0].timestamps[0]).toEqual(action.timestamp);
        expect(state[0].clientConfig).toEqual(action.clientConfig);
        expect(state[0].targetConfig).toEqual(action.targetConfig);
        expect(state[0].functionConfig).toEqual(action.functionConfig);
    });

    it('Does not alter state on other actions', function () {
        var action = createDefaultAction();
        var state = commandHistoryReducer(undefined, action);
        state = commandHistoryReducer(state, { type: 'invalid' });
        expect(state[0].timestamps[0]).toEqual(action.timestamp);
        expect(state[0].clientConfig).toEqual(action.clientConfig);
        expect(state[0].targetConfig).toEqual(action.targetConfig);
        expect(state[0].functionConfig).toEqual(action.functionConfig);
    });

    it('Stores multiple differing commands', function () {
        var action = createDefaultAction();
        var anotherAction = createStoreAction({
            batch: '10',
            client: 'local_batch'
        }, {}, {});
        var state = commandHistoryReducer(undefined, action);
        state = commandHistoryReducer(state, anotherAction);
        expect(state.length).toEqual(2);
    });

    it('Clears a specific command commands', function () {
        var action1 = createDefaultAction();
        var action2 = createStoreAction({
            batch: '10',
            client: 'local_batch'
        }, {}, {});
        var action3 = createStoreAction({
            batch: '20',
            client: 'local_batch'
        }, {}, {});
        var state = commandHistoryReducer(undefined, action1);
        state = commandHistoryReducer(state, action2);
        state = commandHistoryReducer(state, action3);
        var remainingCommands = [state[0], state[2]];
        state = commandHistoryReducer(state, { type: Constants.CLEAR_COMMAND, command: state[1] });
        expect(state).toEqual(remainingCommands);
    });

    it('Clears no command if specified command is invalid', function () {
        var action1 = createDefaultAction();
        var action2 = createStoreAction({
            batch: '10',
            client: 'local_batch'
        }, {}, {});
        var action3 = createStoreAction({
            batch: '20',
            client: 'local_batch'
        }, {}, {});
        var state = commandHistoryReducer(undefined, action1);
        state = commandHistoryReducer(state, action2);
        state = commandHistoryReducer(state, action3);
        var remainingCommands = [state[0], state[1], state[2]];
        state = commandHistoryReducer(state, { type: Constants.CLEAR_COMMAND, command: { invalid: 'invalid' } });
        expect(state).toEqual(remainingCommands);
    });

    it('Only appends timestamps for equal commands', function () {
        var action = createDefaultAction();
        var anotherAction = createDefaultAction();
        var state = commandHistoryReducer(undefined, action);
        state = commandHistoryReducer(state, anotherAction);
        expect(state.length).toEqual(1);
        expect(state[0].timestamps[0]).toEqual(action.timestamp);
        expect(state[0].timestamps[1]).toEqual(anotherAction.timestamp);
    });

    it('Clears all commands', function () {
        var action = createDefaultAction();
        var state = commandHistoryReducer(undefined, action);
        state = commandHistoryReducer(state, { type: Constants.CLEAR_COMMANDS });
        expect(state.length).toEqual(0);
    });
});
