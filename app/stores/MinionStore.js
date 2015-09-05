var Fluxxor = require('fluxxor');
var Constants = require('Constants');
var _ = require('lodash');

var MinionStore = Fluxxor.createStore({
    initialize() {
        this.minions = {};
        this.fetchingMinions = false;
        this.minionsBeingFetched = [];

        this.bindActions(
            Constants.GET_MINIONS, this.fetchingMinionsStarted,
            Constants.GET_MINIONS_SUCCESS, this.minionsReceived,
            Constants.GET_MINION, this.fetchingMinionStarted,
            Constants.GET_MINION_SUCCESS, this.minionReceived
        );
    },

    fetchingMinionsStarted() {
        this.fetchingMinions = true;
    },

    fetchingMinionsInProgress() {
        return this.fetchingMinions;
    },

    fetchingMinionInProgress(minion) {
        return _.contains(this.minionsBeingFetched, minion);
    },

    minionsReceived(rawMinionData) {
        this.minions = rawMinionData.return[0];
        this.fetchingMinions = false;
        this.emit('change');
    },

    fetchingMinionStarted(minion) {
        this.minionsBeingFetched.push(minion);
        delete this.minions[minion];
        this.emit('change');
    },

    minionReceived(minion, rawMinionData) {
        this.minionBeingFetched = this.minionBeingFetched.filter(fetch => minion !== fetch);
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

