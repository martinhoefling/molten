import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { push } from 'connected-react-router';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import { createSession } from 'ActionCreators';
import Constants from 'Constants';

import styles from './Login.less';

const EAUTH_METHODS = ['pam', 'ldap'];

const Login = createReactClass({
    displayName: 'Login',

    propTypes: {
        currentSession: PropTypes.object,
        sessionErrorMessage: PropTypes.string,
        push: PropTypes.func.isRequired,
        createSession: PropTypes.func.isRequired
    },

    getInitialState() {
        return {
            username: '',
            password: '',
            eauth: 'pam'
        };
    },

    componentWillUpdate(nextProps) {
        if (nextProps.currentSession) {
            this.props.push(Constants.URL.ROOT);
        }
    },

    onUsernameChange(event) {
        this.setState({ username: event.target.value });
    },

    onPasswordChange(event) {
        this.setState({ password: event.target.value });
    },

    onEauthChange(event, index, value) {
        this.setState({ eauth: value });
    },

    inputValid() {
        return this.state.username.length && this.state.password.length;
    },

    login() {
        if (this.inputValid()) {
            this.props.createSession(this.state.username, this.state.password, this.state.eauth);
        }
    },

    focusPassword() {
        this.refs.passwordTextField.focus();
    },

    renderLogin() {
        var errorMessage = this.props.sessionErrorMessage;

        var menuItems = EAUTH_METHODS.map(
          item => <MenuItem value={item} primaryText={item} key={item}/>);

        return (
            <div className={styles.this}>
                <TextField
                    hintText='type your username'
                    floatingLabelText='Username'
                    value={this.state.username}
                    onChange={this.onUsernameChange}
                    />
                <TextField
                    ref='passwordTextField'
                    hintText='type your password'
                    floatingLabelText='Password'
                    type='password'
                    value={this.state.password}
                    onChange={this.onPasswordChange}
                    />
                <SelectField
                    floatingLabelText='EAuth'
                    style={{ width: '100px' }}
                    value={this.state.eauth}
                    onChange={this.onEauthChange}>
                    {menuItems}
                </SelectField>
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

export default connect(select, { createSession, push })(Login);
