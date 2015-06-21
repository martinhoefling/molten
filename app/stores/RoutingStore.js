var Fluxxor = require('fluxxor');
var Constants = require('Constants');
var Actions = require('Actions');

var RouteStore = Fluxxor.createStore({
    initialize: function (options) {
        this.router = options.router;

        this.bindActions(
            Constants.TRANSITION, this.routeTransition
        );
    },

    routeTransition: function (payload) {
        var path = payload.path,
            params = payload.params;

        this.router.transitionTo(path, params);
    }
});

module.exports = RouteStore;
