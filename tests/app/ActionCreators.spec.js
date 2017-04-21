import * as ActionCreators from 'ActionCreators';
import Constants from 'Constants';

describe('ActionCreators', function () {
    var request, dispatchMock;

    function sessionTest(testfunc, params) {
        describe(testfunc, function () {
            beforeEach(function () {
                dispatchMock = jasmine.createSpy();
                ActionCreators[testfunc].apply(this, params)(dispatchMock);
                request = jasmine.Ajax.requests.mostRecent();
            });

            it('dispatches SET_SESSION first', function () {
                expect(dispatchMock.calls.argsFor(0)).toEqual([{ type: Constants.SET_SESSION }]);
            });

            describe('on fail', function () {
                beforeEach(function () {
                    request.respondWith({
                        status: 401
                    });
                });

                it('dispatches SET_SESSION_FAIL', function () {
                    expect(dispatchMock.calls.argsFor(1)).toEqual([{
                        type: Constants.SET_SESSION_FAIL,
                        error: jasmine.any(Error)
                    }]);
                });
            });

            describe('on success', function () {
                var dispatchSuccessMock, dispatchCapabilitiesMock, dispatchDocumentationMock,
                    dispatchMinionsMock, dispatchJobsMock, capabilityRequest, documentationRequest,
                    minionsRequest, jobsRequest;

                beforeEach(function () {
                    request.respondWith({
                        status: 200,
                        responseText: '{ "Hello": 42 }'
                    });
                    dispatchSuccessMock = jasmine.createSpy();
                    dispatchCapabilitiesMock = jasmine.createSpy();
                    dispatchDocumentationMock = jasmine.createSpy();
                    dispatchMinionsMock = jasmine.createSpy();
                    dispatchJobsMock = jasmine.createSpy();

                    dispatchMock.calls.argsFor(1)[0](dispatchSuccessMock); // Call returned function
                    dispatchSuccessMock.calls.argsFor(1)[0](dispatchCapabilitiesMock);
                    capabilityRequest = jasmine.Ajax.requests.mostRecent();

                    dispatchSuccessMock.calls.argsFor(2)[0](dispatchDocumentationMock);
                    documentationRequest = jasmine.Ajax.requests.mostRecent();

                    dispatchSuccessMock.calls.argsFor(3)[0](dispatchMinionsMock);
                    minionsRequest = jasmine.Ajax.requests.mostRecent();

                    dispatchSuccessMock.calls.argsFor(4)[0](dispatchJobsMock);
                    jobsRequest = jasmine.Ajax.requests.mostRecent();
                });

                it('dispatches SET_SESSION_SUCCESS', function () {
                    expect(dispatchSuccessMock.calls.argsFor(0)).toEqual([{
                        type: Constants.SET_SESSION_SUCCESS,
                        session: { Hello: 42 }
                    }]);
                });

                describe('load capabilities', function () {
                    it('dispatches GET_CAPABILITIES', function () {
                        expect(dispatchCapabilitiesMock.calls.argsFor(0)).toEqual([{
                            type: Constants.GET_CAPABILITIES
                        }]);
                    });

                    describe('on success', function () {
                        beforeEach(function () {
                            capabilityRequest.respondWith({
                                status: 200,
                                responseText: '{ "Hello": 42 }'
                            });
                        });

                        it('dispatches GET_CAPABILITIES_SUCCESS', function () {
                            expect(dispatchCapabilitiesMock.calls.argsFor(1)).toEqual([{
                                type: Constants.GET_CAPABILITIES_SUCCESS,
                                capabilities: { Hello: 42 }
                            }]);
                        });
                    });

                    describe('on fail', function () {
                        it('with status 400 dispatches only GET_CAPABILITIES_FAIL', function () {
                            capabilityRequest.respondWith({
                                status: 400
                            });

                            expect(dispatchCapabilitiesMock.calls.argsFor(1)).toEqual([{
                                type: Constants.GET_CAPABILITIES_FAIL,
                                error: jasmine.any(Error)
                            }]);
                            expect(dispatchCapabilitiesMock.calls.count()).toBe(2);
                        });

                        describe('with status 401', function () {
                            beforeEach(function () {
                                capabilityRequest.respondWith({
                                    status: 401
                                });
                            });

                            it('dispatch GET_CAPABILITIES_FAIL', function () {
                                expect(dispatchCapabilitiesMock.calls.argsFor(1)).toEqual([{
                                    type: Constants.GET_CAPABILITIES_FAIL,
                                    error: jasmine.any(Error)
                                }]);
                            });

                            it('dispatch SET_SESSION for resetting', function () {
                                expect(dispatchCapabilitiesMock.calls.argsFor(2)).toEqual([{
                                    type: Constants.SET_SESSION
                                }]);
                            });

                            it('dispatch pushState', function () {
                                expect(dispatchCapabilitiesMock.calls.argsFor(3)).toEqual([{
                                    type: '@@router/CALL_HISTORY_METHOD',
                                    payload: {
                                        method: 'push',
                                        args: ['/molten/login']
                                    }
                                }]);
                            });
                        });
                    });
                });

                describe('load minions', function () {
                    it('dispatches GET_MINIONS', function () {
                        expect(dispatchMinionsMock.calls.argsFor(0)).toEqual([{
                            type: Constants.GET_MINIONS
                        }]);
                    });

                    describe('on success', function () {
                        beforeEach(function () {
                            minionsRequest.respondWith({
                                status: 200,
                                responseText: '{ "Hello": 42 }'
                            });
                        });

                        it('dispatches GET_MINIONS_SUCCESS', function () {
                            expect(dispatchMinionsMock.calls.argsFor(1)).toEqual([{
                                type: Constants.GET_MINIONS_SUCCESS,
                                minionList: { Hello: 42 }
                            }]);
                        });
                    });

                    describe('on fail', function () {
                        it('dispatches GET_MINIONS_FAIL', function () {
                            minionsRequest.respondWith({
                                status: 400
                            });

                            expect(dispatchMinionsMock.calls.argsFor(1)).toEqual([{
                                type: Constants.GET_MINIONS_FAIL,
                                error: jasmine.any(Error)
                            }]);
                            expect(dispatchMinionsMock.calls.count()).toBe(2);
                        });
                    });
                });

                describe('load jobs', function () {
                    it('dispatches GET_JOBS', function () {
                        expect(dispatchJobsMock.calls.argsFor(0)).toEqual([{
                            type: Constants.GET_JOBS
                        }]);
                    });

                    describe('on success', function () {
                        beforeEach(function () {
                            jobsRequest.respondWith({
                                status: 200,
                                responseText: '{ "Hello": 42 }'
                            });
                        });

                        it('dispatches GET_JOBS_SUCCESS', function () {
                            expect(dispatchJobsMock.calls.argsFor(1)).toEqual([{
                                type: Constants.GET_JOBS_SUCCESS,
                                jobList: { Hello: 42 }
                            }]);
                        });
                    });

                    describe('on fail', function () {
                        it('dispatches GET_JOBS_FAIL', function () {
                            jobsRequest.respondWith({
                                status: 400
                            });

                            expect(dispatchJobsMock.calls.argsFor(1)).toEqual([{
                                type: Constants.GET_JOBS_FAIL,
                                error: jasmine.any(Error)
                            }]);
                            expect(dispatchJobsMock.calls.count()).toBe(2);
                        });
                    });
                });

                describe('load documentation', function () {
                    it('dispatches GET_DOCUMENTATION for execution', function () {
                        expect(dispatchDocumentationMock.calls.argsFor(0)).toEqual([{
                            type: Constants.GET_DOCUMENTATION,
                            docType: 'execution'
                        }]);
                    });

                    it('dispatches GET_DOCUMENTATION for runner', function () {
                        expect(dispatchDocumentationMock.calls.argsFor(1)).toEqual([{
                            type: Constants.GET_DOCUMENTATION,
                            docType: 'runner'
                        }]);
                    });

                    describe('on success', function () {
                        beforeEach(function () {
                            documentationRequest.respondWith({
                                status: 200,
                                responseText: '{ "Hello": 42 }'
                            });
                        });

                        it('dispatches GET_DOCUMENTATION_SUCCESS', function () {
                            expect(dispatchDocumentationMock.calls.argsFor(3)).toEqual([{
                                type: Constants.GET_DOCUMENTATION_SUCCESS,
                                docType: 'wheel',
                                documentation: { Hello: 42 }
                            }]);
                        });
                    });

                    describe('on fail', function () {
                        it('dispatches GET_DOCUMENTATION_FAIL', function () {
                            documentationRequest.respondWith({
                                status: 400
                            });

                            expect(dispatchDocumentationMock.calls.argsFor(3)).toEqual([{
                                type: Constants.GET_DOCUMENTATION_FAIL,
                                error: jasmine.any(Error)
                            }]);
                        });
                    });
                });
            });
        });
    }

    sessionTest('testSessionStatus', []);
    sessionTest('createSession', ['someuser', 'somepass']);

    function testAsyncCreator(creator, args, basename, submit, successResponse, success, failResponse, fail) {
        describe(creator, function () {
            beforeEach(function () {
                dispatchMock = jasmine.createSpy();
                ActionCreators[creator].apply(this, args)(dispatchMock);
                request = jasmine.Ajax.requests.mostRecent();
            });

            it(`dispatches ${basename} first`, function () {
                expect(dispatchMock.calls.argsFor(0)).toEqual([submit]);
            });

            it(`on success dispatches ${basename}_SUCCESS`, function () {
                request.respondWith(successResponse);

                expect(dispatchMock.calls.argsFor(1)).toEqual([success]);
            });

            describe('on fail', function () {
                beforeEach(function () {
                    request.respondWith(failResponse);
                });

                it(`dispatch ${basename}_FAIL`, function () {
                    expect(dispatchMock.calls.argsFor(1)).toEqual([fail]);
                });

                it('dispatch SET_SESSION for resetting', function () {
                    expect(dispatchMock.calls.argsFor(2)).toEqual([{
                        type: Constants.SET_SESSION
                    }]);
                });

                it('dispatch pushState', function () {
                    expect(dispatchMock.calls.argsFor(3)).toEqual([
                        {
                            type: '@@router/CALL_HISTORY_METHOD',
                            payload: {
                                method: 'push',
                                args: ['/molten/login']
                            }
                        }
                        ]);
                });
            });
        });
    }

    testAsyncCreator(
        'executeCommand',
        [{ Hello: 42 }],
        'SUBMIT_COMMAND',
        {
            type: Constants.SUBMIT_COMMAND,
            commandObj: { Hello: 42 }
        },
        {
            status: 200,
            responseText: '{ "Ahoi": 43 }'
        },
        {
            type: Constants.SUBMIT_COMMAND_SUCCESS,
            commandObj: { Hello: 42 },
            result: { Ahoi: 43 }
        },
        {
            status: 401
        },
        {
            type: Constants.SUBMIT_COMMAND_FAIL,
            commandObj: { Hello: 42 },
            error: jasmine.any(Error)
        }
    );

    testAsyncCreator(
        'loadJobResult',
        [1234],
        'GET_JOB',
        {
            type: Constants.GET_JOB,
            jid: 1234
        },
        {
            status: 200,
            responseText: '{ "Ahoi": 43 }'
        },
        {
            type: Constants.GET_JOB_SUCCESS,
            jid: 1234,
            job: { Ahoi: 43 }
        },
        {
            status: 401
        },
        {
            type: Constants.GET_JOB_FAIL,
            jid: 1234,
            error: jasmine.any(Error)
        }
    );

    testAsyncCreator(
        'logout',
        [],
        'UNSET_SESSION',
        {
            type: Constants.UNSET_SESSION
        },
        {
            status: 200,
            responseText: '{ "Ahoi": 43 }'
        },
        {
            type: Constants.UNSET_SESSION_SUCCESS,
            session: undefined
        },
        {
            status: 401
        },
        {
            type: Constants.UNSET_SESSION_FAIL,
            error: jasmine.any(Error)
        }
    );
});
