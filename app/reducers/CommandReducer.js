var Fluxxor = require('fluxxor');
var Constants = require('Constants');

var CommandStore = Fluxxor.createStore({
    initialize() {
        this._lowstate = null;
        this._commandResult = null;
        this._commandResultError = null;
        this._inProgress = false;

        this.bindActions(
            Constants.SUBMIT_COMMAND, this.submitCommand,
            Constants.SUBMIT_COMMAND_SUCCESS, this.submitCommandSuccess,
            Constants.SUBMIT_COMMAND_FAIL, this.submitCommandFail
        );
    },

    getCommandResult() {
        return this._commandResult;
    },

    submitCommand(lowstate) {
        this._lowstate = lowstate;
        this._commandResult = null;
        this._commandResultError = null;
        this._inProgress = true;
        this.emit('change');
    },

    submitCommandSuccess(resultObj) {
        this._commandResult = resultObj;
        this._inProgress = false;
        this.emit('change');
    },

    submitCommandFail(error) {
        this._commandResultError = error;
        this._inProgress = false;
        this.emit('change');
    },

    inProgress() {
        return this._inProgress;
    }
});

module.exports = CommandStore;
