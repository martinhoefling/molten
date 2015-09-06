var Constants = require('Constants');
var REST = require('helpers/rest');

var API_URL = window.location.origin;

function _getCapabilities() {
    this.dispatch(Constants.GET_CAPABILITIES);

    REST.getAPI({ basepath: API_URL },
        capabilities => this.dispatch(Constants.GET_CAPABILITIES_SUCCESS, capabilities),
        error => this.dispatch(Constants.GET_CAPABILITIES_FAIL, error)
    );
}

function _getDocumentation() {
    _.values(Constants.DOCUMENTATION_TYPE).forEach(function (type) {
        this.dispatch(Constants.GET_DOCUMENTATION, type);

        REST.obtainDocumentation({ basepath: API_URL, type },
                documentation => this.dispatch(Constants.GET_DOCUMENTATION_SUCCESS, { type, documentation }),
                error => this.dispatch(Constants.GET_DOCUMENTATION_FAIL, error)
        );
    }.bind(this));
}

function _listenForEvents() {
    var sourceURL = API_URL + '/events';
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
    REST.getMinions({ basepath: API_URL },
        minionList => this.dispatch(Constants.GET_MINIONS_SUCCESS, minionList),
        error => this.dispatch(Constants.GET_MINIONS_FAIL, error)
    );
}

function _loadJobs() {
    this.dispatch(Constants.GET_JOBS);
    REST.getJobs({ basepath: API_URL },
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
            { basepath: API_URL },
            session => _sessionSuccess.call(this, session),
            error => this.dispatch(Constants.SET_SESSION_FAIL, error)
        );
    },

    createSession(username, password) {
        this.dispatch(Constants.SET_SESSION);

        // TODO: Make eauth configurable
        REST.createSession({
            basepath: API_URL,
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
                basepath: API_URL,
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
                basepath: API_URL
            }, session => this.dispatch(Constants.UNSET_SESSION_SUCCESS, session),
            error => this.dispatch(Constants.UNSET_SESSION_FAIL, error)
        );
    },

    transition: function (path, params) {
        this.dispatch(Constants.TRANSITION, { path: path, params: params });
    }
};
