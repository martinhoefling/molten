import { pushState } from 'redux-router';
import _ from 'lodash';

import Constants from 'Constants';
import * as REST from 'helpers/rest';
import config from 'config';

var setSession = () => ({ type: Constants.SET_SESSION });
var setSessionFail = error => ({ type: Constants.SET_SESSION_FAIL, error });
var setSessionSuccess = session => ({ type: Constants.SET_SESSION_SUCCESS, session });

var unsetSession = () => ({ type: Constants.UNSET_SESSION });
var unsetSessionFail = error => ({ type: Constants.UNSET_SESSION_FAIL, error });
var unsetSessionSuccess = session => ({ type: Constants.UNSET_SESSION_SUCCESS, session });

var submitCommand = commandObj => ({ type: Constants.SUBMIT_COMMAND, commandObj });
var submitCommandFail = (commandObj, error) => ({ type: Constants.SUBMIT_COMMAND_FAIL, commandObj, error });
var submitCommandSuccess = (commandObj, result) => ({ type: Constants.SUBMIT_COMMAND_SUCCESS, commandObj, result });

var getCapabilities = () => ({ type: Constants.GET_CAPABILITIES });
var getCapabilitiesFail = error => ({ type: Constants.GET_CAPABILITIES_FAIL, error });
var getCapabilitiesSuccess = capabilities => ({ type: Constants.GET_CAPABILITIES_SUCCESS, capabilities });

var getJobs = () => ({ type: Constants.GET_JOBS });
var getJobsFail = error => ({ type: Constants.GET_JOBS_FAIL, error });
var getJobsSuccess = jobList => ({ type: Constants.GET_JOBS_SUCCESS, jobList });

var getJob = jid => ({ type: Constants.GET_JOB, jid });
var getJobFail = (jid, error) => ({ type: Constants.GET_JOB_FAIL, jid, error });
var getJobSuccess = (jid, job) => ({ type: Constants.GET_JOB_SUCCESS, jid, job });

var getMinions = () => ({ type: Constants.GET_MINIONS });
var getMinionsFail = error => ({ type: Constants.GET_MINIONS_FAIL, error });
var getMinionsSuccess = minionList => ({ type: Constants.GET_MINIONS_SUCCESS, minionList });

var getDocumentation = docType => ({ type: Constants.GET_DOCUMENTATION, docType });
var getDocumentationFail = error => ({ type: Constants.GET_DOCUMENTATION_FAIL, error });
var getDocumentationSuccess = (docType, documentation) =>
    ({ type: Constants.GET_DOCUMENTATION_SUCCESS, docType, documentation });

export const setSetting = (setting, value) => ({ type: Constants.SET_SETTING, setting, value });
export const clearSetting = setting => ({ type: Constants.CLEAR_SETTING, setting });

export const serverEventReceived = event => ({ type: Constants.SERVER_EVENT_RECEIVED, event });
export const clearEvents = () => ({ type: Constants.CLEAR_EVENTS });

function _dispatchAndRedirect(dispatch, action) {
    dispatch(action);
    if (!action.error || action.error.status === 401) {
        dispatch(setSession());
        dispatch(pushState(null, Constants.URL.LOGIN));
    }
}

export function createSession(username, password) {
    return function(dispatch) {
        dispatch(setSession());
        // TODO: Make eauth configurable
        REST.createSession({
                basepath: config.API_BASE_URL,
                username: username,
                password: password,
                eauth: 'pam'
            },
            session => dispatch(_sessionSuccess(session)),
            error => dispatch(setSessionFail(error))
        );
    };
}

function _sessionSuccess(session) {
    return function(dispatch) {
        dispatch(setSessionSuccess(session));
        dispatch(_getCapabilities());
        dispatch(_getDocumentation());
        dispatch(_loadMinions());
        dispatch(_loadJobs());
    };
}

function _getCapabilities(isRetry=false) {
    return function(dispatch) {
        dispatch(getCapabilities());
        REST.getAPI({ basepath: config.API_BASE_URL },
            function (capabilities) {
                if (capabilities !== null) {
                    dispatch(getCapabilitiesSuccess(capabilities));
                } else if (!isRetry) {
                    console.log('Capability load retry');
                    dispatch(_getCapabilities(true));
                } else {
                    dispatch(getCapabilitiesFail(new Error('Capability load retry failed')));
                }
            },
            error => _dispatchAndRedirect(dispatch, getCapabilitiesFail(error))
        );
    };
}

function _getDocumentation() {
    return function(dispatch) {
        _.values(Constants.DOCUMENTATION_TYPE).forEach(function (docType) {
            dispatch(getDocumentation(docType));

            REST.obtainDocumentation({ basepath: config.API_BASE_URL, type: docType },
                documentation => dispatch(getDocumentationSuccess(docType, documentation)),
                error => _dispatchAndRedirect(dispatch, getDocumentationFail(error))
            );
        });
    };
}

function _loadMinions() {
    return function (dispatch) {
        dispatch(getMinions());
        REST.getMinions({ basepath: config.API_BASE_URL },
            minionList => dispatch(getMinionsSuccess(minionList)),
            error => _dispatchAndRedirect(dispatch, getMinionsFail(error))
        );
    };
}

function _loadJobs() {
    return function (dispatch) {
        dispatch(getJobs());
        REST.getJobs({ basepath: config.API_BASE_URL },
            jobList => dispatch(getJobsSuccess(jobList)),
            error => _dispatchAndRedirect(dispatch, getJobsFail(error))
        );
    };
}

export function testSessionStatus() {
    return function(dispatch) {
        dispatch(setSession());
        REST.testSession(
            { basepath: config.API_BASE_URL },
            session => dispatch(_sessionSuccess(session)),
            error => _dispatchAndRedirect(dispatch, setSessionFail(error))
        );
    };
}

export function executeCommand(commandObj) {
    return function(dispatch) {
        dispatch(submitCommand(commandObj));

        REST.postAPI({ basepath: config.API_BASE_URL, lowstate: commandObj },
            resultObj => dispatch(submitCommandSuccess(commandObj, resultObj)),
            error => _dispatchAndRedirect(dispatch, submitCommandFail(commandObj, error))
        );
    };
}

export function logout() {
    return function(dispatch) {
        dispatch(unsetSession());

        REST.destroySession({ basepath: config.API_BASE_URL },
            () => _dispatchAndRedirect(dispatch, unsetSessionSuccess()),
            error => _dispatchAndRedirect(dispatch, unsetSessionFail(error))
        );
    };
}

export function loadJobResult(jid) {
    return function (dispatch) {
        dispatch(getJob(jid));
        REST.getJob({ basepath: config.API_BASE_URL, jid },
            job => dispatch(getJobSuccess(jid, job)),
            error => _dispatchAndRedirect(dispatch, getJobFail(jid, error))
        );
    };
}
