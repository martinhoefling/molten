jest.dontMock('stores/EventStore');
var EventStore = require('stores/EventStore');

var dateStr = '2015-09-01T22:02:58.775597';
var rawEvent = {
    data: '{"tag": "sometag", "data": {"datakey": "datavalue"}}',
    timeStamp: new Date(dateStr)
};

describe('EventStore', function() {
    var store;
    beforeEach(function () {
        store = new EventStore();
    });

    it('has no events initially', function() {
        expect(store.getEvents().length).toBe(0);
    });
    
    describe('after receiving an event', function () {
        beforeEach(function () {
            spyOn(store, 'emit');
            store.newEventReceived(rawEvent);
        });

        it('emits "change" after adding the event', function () {
            expect(store.emit).toHaveBeenCalledWith('change');
        });

        it('has a parsed event stored', function () {
            var event = store.getEvents()[0];
            expect(+event.timestamp).toEqual(+new Date(dateStr));
            expect(event.data.datakey).toEqual('datavalue');
            expect(event.tag).toEqual('sometag');
        });

        describe('and consecutive clearing', function () {
            beforeEach(function () {
                expect(store.getEvents().length).toBe(1);
                store.emit.reset();
                store.clearEvents();
            });

            it('has no events', function () {
                expect(store.getEvents().length).toBe(0);
            });

            it('emits "change" after clearing', function () {
                expect(store.emit).toHaveBeenCalledWith('change');
            });
        });
    });
});
