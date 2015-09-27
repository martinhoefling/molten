var Fluxxor = require('fluxxor');
var Constants = require('Constants');

var RouteStore = Fluxxor.createStore({
    initialize: function (options) {
        this.history = options.history;

        this.bindActions(
            Constants.TRANSITION, this.routeTransition,
            Constants.GET_CAPABILITIES_FAIL, this.loginIfRequired,
            Constants.SET_SESSION_FAIL, this.loginIfRequired,
            Constants.UNSET_SESSION, this.toLogin
        );
    },

    loginIfRequired(err) {
        if (err.status === 401) {
            this.toLogin();
        }
    },

    toLogin() {
        this.history.pushState(null, Constants.URL.LOGIN);
    },

    routeTransition: function (path) {
        this.history.pushState(null, path);
    }
});

module.exports = RouteStore;
