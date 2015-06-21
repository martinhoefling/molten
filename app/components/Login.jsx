var React = require('react');
var TextField = require('material-ui/lib/text-field');
var FlatButton = require('material-ui/lib/flat-button');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);

var styles = require('./Login.css');

var Login = React.createClass({
    mixins: [FluxMixin],

    propTypes: {
        errorMessage: React.PropTypes.string.isRequired
    },

    getInitialState() {
        return {
            username: '',
            password: '',
            firstLogin: true
        };
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
            this.setState({ firstLogin: false });
        }
    },

    focusPassword() {
        this.refs.passwordTextField.focus();
    },

    render() {
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
                    {this.state.firstLogin ? '' : this.props.errorMessage}
                </span>
                <FlatButton label='Login'
                    onClick={this.login}
                    disabled={!this.inputValid()}
                    />
            </div>
        );
    }
});

module.exports = Login;
