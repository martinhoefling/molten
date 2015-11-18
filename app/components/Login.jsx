import React from 'react';
import { connect } from 'react-redux';
import { Link, History } from 'react-router';

import TextField from 'material-ui/lib/text-field';
import FlatButton from 'material-ui/lib/flat-button';

import { createSession } from 'ActionCreators';
import Constants from 'Constants';

import styles from './Login.less';

const Login = React.createClass({
    mixins: [History],

    propTypes: {
        currentSession: React.PropTypes.object,
        sessionErrorMessage: React.PropTypes.string,
        createSession: React.PropTypes.func.isRequired
    },

    getInitialState() {
        return {
            username: '',
            password: ''
        };
    },

    componentWillUpdate(nextProps) {
        if (nextProps.currentSession) {
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
            this.props.createSession(this.state.username, this.state.password);
        }
    },

    focusPassword() {
        this.refs.passwordTextField.focus();
    },

    renderLogin() {
        var errorMessage = this.props.sessionErrorMessage;

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

function select(state) {
    return {
        currentSession: state.Session.session,
        sessionErrorMessage: state.Session.error ? state.Session.error.message : null
    };
}

export default connect(select, { createSession })(Login);
