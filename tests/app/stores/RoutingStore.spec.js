jest.dontMock('stores/RoutingStore');
var RoutingStore = require('stores/RoutingStore');

describe('RoutingStore', function() {
    var store, routerMock;
    beforeEach(function () {
        routerMock = jasmine.createSpyObj('router', ['transitionTo']);
        store = new RoutingStore({ router: routerMock });
    });

    it('routes transitions', function() {
        var payload = { path: 'somepath', params: 'someparam' };
        store.routeTransition(payload);
        expect(routerMock.transitionTo).toHaveBeenCalledWith('somepath', 'someparam');
    });
});
