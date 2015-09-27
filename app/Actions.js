var Constants = require('Constants');
var REST = require('helpers/rest');

function _getCapabilities(isRetry) {
    this.dispatch(Constants.GET_CAPABILITIES);

    REST.getAPI({ basepath: CONFIG.API_BASE_URL },
        function (capabilities) {
            if (capabilities !== null) {
                this.dispatch(Constants.GET_CAPABILITIES_SUCCESS, capabilities);
            } else if (!isRetry) {
                console.log('Capability load retry');
                _getCapabilities.call(this, true);
            }
        }.bind(this),
        error => this.dispatch(Constants.GET_CAPABILITIES_FAIL, error)
    );
}

function _getDocumentation() {
    _.values(Constants.DOCUMENTATION_TYPE).forEach(function (type) {
        this.dispatch(Constants.GET_DOCUMENTATION, type);

        REST.obtainDocumentation({ basepath: CONFIG.API_BASE_URL, type },
                documentation => this.dispatch(Constants.GET_DOCUMENTATION_SUCCESS, { type, documentation }),
                error => this.dispatch(Constants.GET_DOCUMENTATION_FAIL, error)
        );
    }.bind(this));
}

function _listenForEvents() {
    var sourceURL = CONFIG.API_BASE_URL + '/events';
    var source = new EventSource(sourceURL);
    source.onopen = function() {
        console.debug('server event stream opened: ' + sourceURL);
    };
    source.onerror = function(event) {
        console.debug('server event error!', event);
    };
    source.onmessage = event => this.dispatch(Constants.SERVER_EVENT_RECEIVED, event);
}

function _loadMinions() {
    this.dispatch(Constants.GET_MINIONS);
    REST.getMinions({ basepath: CONFIG.API_BASE_URL },
        minionList => this.dispatch(Constants.GET_MINIONS_SUCCESS, minionList),
        error => this.dispatch(Constants.GET_MINIONS_FAIL, error)
    );
}

function _loadJobs() {
    this.dispatch(Constants.GET_JOBS);
    REST.getJobs({ basepath: CONFIG.API_BASE_URL },
        jobList => this.dispatch(Constants.GET_JOBS_SUCCESS, jobList),
        error => this.dispatch(Constants.GET_JOBS_FAIL, error)
    );
}

function _sessionSuccess(session) {
    this.dispatch(Constants.SET_SESSION_SUCCESS, session || {});
    _getCapabilities.call(this);
    _getDocumentation.call(this);
    _listenForEvents.call(this);
    _loadMinions.call(this);
    _loadJobs.call(this);
}

module.exports = {
    testSessionStatus() {
        this.dispatch(Constants.SET_SESSION);
        REST.testSession(
            { basepath: CONFIG.API_BASE_URL },
            session => _sessionSuccess.call(this, session),
            error => this.dispatch(Constants.SET_SESSION_FAIL, error)
        );
    },

    getCapabilities: _getCapabilities,

    createSession(username, password) {
        this.dispatch(Constants.SET_SESSION);

        // TODO: Make eauth configurable
        REST.createSession({
            basepath: CONFIG.API_BASE_URL,
            username: username,
            password: password,
            eauth: 'pam'
        },
                session => _sessionSuccess.call(this, session),
                error => this.dispatch(Constants.SET_SESSION_FAIL, error)
        );
    },

    submitCommand(commandObj) {
        this.dispatch(Constants.SUBMIT_COMMAND, commandObj);

        REST.postAPI({
                basepath: CONFIG.API_BASE_URL,
                lowstate: commandObj
            }, resultObj => this.dispatch(Constants.SUBMIT_COMMAND_SUCCESS, resultObj),
            error => this.dispatch(Constants.SUBMIT_COMMAND_FAIL, error));
    },

    clearEvents() {
        this.dispatch(Constants.CLEAR_EVENTS);
    },

    logout() {
        this.dispatch(Constants.UNSET_SESSION);

        REST.destroySession({
                basepath: CONFIG.API_BASE_URL
            }, session => this.dispatch(Constants.UNSET_SESSION_SUCCESS, session),
            error => this.dispatch(Constants.UNSET_SESSION_FAIL, error)
        );
    },

    loadJobResult(jid) {
        this.dispatch(Constants.GET_JOB, jid);
        REST.getJob({
                basepath: CONFIG.API_BASE_URL,
                jid
            }, job => this.dispatch(Constants.GET_JOB_SUCCESS, job),
            error => this.dispatch(Constants.GET_JOB_FAIL, error));
    },

    transition: function (path) {
        this.dispatch(Constants.TRANSITION, path);
    }
};
