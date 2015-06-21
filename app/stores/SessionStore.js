var Fluxxor = require('fluxxor');
var Constants = require('Constants');

var SessionStore = Fluxxor.createStore({
    initialize() {
        this.session = null;
        this.error = null;

        this.bindActions(
            Constants.SET_SESSION, this.setSession,
            Constants.SET_SESSION_SUCCESS, this.setSessionSuccess,
            Constants.SET_SESSION_FAIL, this.setSessionFail,
            Constants.UNSET_SESSION, this.unsetSession,
            Constants.UNSET_SESSION_SUCCESS, this.unsetSessionSuccess,
            Constants.UNSET_SESSION_FAIL, this.unsetSessionFail
        );
    },

    getSession() {
        return this.session || null;
    },

    getErrorMessage() {
        if (this.error && this.error.message) {
            return this.error.message;
        }
        return '';
    },

    setSession() {
        this.session = null;
        this.error = null;
        this.emit('change');
    },

    setSessionSuccess(session) {
        this.session = session;
        this.emit('change');
    },

    setSessionFail(error) {
        this.session = null;
        this.error = error;
        this.emit('change');
    },

    unsetSession() {
        this.error = null;
        this.emit('change');
    },

    unsetSessionSuccess() {
        this.session = null;
        this._clearCookie();
        this.emit('change');
    },

    unsetSessionFail(error) {
        this.error = error;
        this.session = null;
        this._clearCookie();
        this.emit('change');
    },

    _clearCookie() {
        var date = new Date();
        date.setTime(date.getTime() - 1);
        var expires = '; expires=' + date.toGMTString();
        document.cookie = 'session_id=' + expires + '; path=/';
    }
});

module.exports = SessionStore;

