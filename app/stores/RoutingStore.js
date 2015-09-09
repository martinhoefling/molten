var Fluxxor = require('fluxxor');
var Constants = require('Constants');
var Actions = require('Actions');

var RouteStore = Fluxxor.createStore({
    initialize: function (options) {
        this.router = options.router;

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
        this.router.transitionTo('/login');
    },

    routeTransition: function (payload) {
        var path = payload.path,
            params = payload.params;

        this.router.transitionTo(path, params);
    }
});

module.exports = RouteStore;
