jest.dontMock('stores/RoutingStore');
var RoutingStore = require('stores/RoutingStore');

describe('RoutingStore', function() {
    var store, historyMock;
    beforeEach(function () {
        historyMock = jasmine.createSpyObj('history', ['pushState']);
        store = new RoutingStore({ history: historyMock });
    });

    it('routes transitions', function() {
        var path = 'somepath?somequery';
        store.routeTransition(path);
        expect(historyMock.pushState).toHaveBeenCalledWith(null, 'somepath?somequery');
    });
});
