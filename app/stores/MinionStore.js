var Fluxxor = require('fluxxor');
var Constants = require('Constants');
var _ = require('lodash');

var MinionStore = Fluxxor.createStore({
    initialize() {
        this.minions = {};

        this.bindActions(
            Constants.GET_MINIONS_SUCCESS, this.minionsReceived,
            Constants.GET_MINION_SUCCESS, this.minionReceived
        );
    },

    minionsReceived(rawMinionData) {
        this.minions = rawMinionData.return[0];
        this.emit('change');
    },

    minionReceived(rawMinionData) {
        _.assign(this.minions, rawMinionData.return[0]);
        this.emit('change');
    },

    getMinions() {
        return _.keys(this.minions).map(key => ({
                id: key,
                grains: this.minions[key]
            }));
    }
});

module.exports = MinionStore;

