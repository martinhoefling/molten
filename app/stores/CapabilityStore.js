var Fluxxor = require('fluxxor');
var Constants = require('Constants');

var Clients = require('models/Clients');

var CapabilityStore = Fluxxor.createStore({
    initialize() {
        this.capabilities = null;
        this.error = null;

        this.bindActions(
            Constants.GET_CAPABILITIES, this.setCapabilities,
            Constants.GET_CAPABILITIES_SUCCESS, this.setCapabilitiesSuccess,
            Constants.GET_CAPABILITIES_FAIL, this.setCapabilitiesFail
        );
    },

    setCapabilities() {
        this.capabilities = null;
        this.error = null;
        this.emit('change');
    },

    getCapabilities() {
        return this.capabilities || null;
    },

    getClients() {
        return this.capabilities ? Clients.getClients(this.getCapabilities().clients) : null;
    },

    setCapabilitiesSuccess(capabilities) {
        this.capabilities = capabilities;
        this.emit('change');
    },

    setCapabilitiesFail(error) {
        this.capabilities = null;
        this.error = error;
        this.emit('change');
    },

    getErrorMessage() {
        if (this.error && this.error.message) {
            return this.error.message;
        }
        return '';
    }
});

module.exports = CapabilityStore;

