var React = require('react');
var TextField = require('material-ui/lib/text-field');
var FlatButton = require('material-ui/lib/flat-button');
var Link = require('react-router').Link;
var History = require('react-router').History;

var Constants = require('Constants');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var styles = require('./Login.less');

var Login = React.createClass({
    mixins: [FluxMixin, History, StoreWatchMixin('SessionStore')],

    getStateFromFlux: function () {
        var flux = this.getFlux();
        return {
            currentSession: flux.store('SessionStore').getSession(),
            sessionErrorMessage: flux.store('SessionStore').getErrorMessage()
        };
    },

    getInitialState() {
        return {
            username: '',
            password: ''
        };
    },

    componentWillUpdate(nextProps, nextState) {
        if (nextState.currentSession) {
            this.history.pushState(null, Constants.URL.ROOT);
        }
    },

    onUsernameChange(event) {
        this.setState({ username: event.target.value });
    },

    onPasswordChange(event) {
        this.setState({ password: event.target.value });
    },

    inputValid() {
        return this.state.username.length && this.state.password.length;
    },

    login() {
        if (this.inputValid()) {
            this.getFlux().actions.createSession(this.state.username, this.state.password);
        }
    },

    focusPassword() {
        this.refs.passwordTextField.focus();
    },

    renderLogin() {
        var errorMessage = this.state.sessionErrorMessage;
        console.log(errorMessage);

        return (
            <div className={styles.this}>
                <TextField
                    hintText='type your username'
                    floatingLabelText='Username'
                    value={this.state.username}
                    onChange={this.onUsernameChange}
                    onEnterKeyDown={this.focusPassword}
                    />
                <TextField
                    ref='passwordTextField'
                    hintText='type your password'
                    floatingLabelText='Password'
                    type='password'
                    value={this.state.password}
                    onChange={this.onPasswordChange}
                    onEnterKeyDown={this.login}
                    />
                <span
                    className={styles.errorMessage}>
                    {errorMessage}
                </span>
                <FlatButton label='Login'
                    onClick={this.login}
                    disabled={!this.inputValid()}
                    />
            </div>
        );
    },

    render() {
        if (this.state.currentSession) {
            return (
                <div className={styles.this}>
                    already logged in! <Link to={Constants.URL.ROOT}>Continue here</Link>
                </div>
            );
        }
        return this.renderLogin();
    }
});

module.exports = Login;
