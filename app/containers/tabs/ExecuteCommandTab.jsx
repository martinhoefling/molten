import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import classnames from 'classnames';
import RaisedButton from 'material-ui/RaisedButton';

import { getClients, getClient } from 'models/Clients';
import ClientConfiguration from 'components/execute/ClientConfiguration';
import TargetConfiguration from 'components/execute/TargetConfiguration';
import FunctionConfiguration from 'components/execute/FunctionConfiguration';
import CommandDisplay from 'components/execute/CommandDisplay';
import LoadingIndicator from 'elements/LoadingIndicator';
import { executeCommand, storeCommand, setClientConfiguration,
    setTargetConfiguration, setFunctionConfiguration } from 'ActionCreators';

import tabStyle from './Tab.less';
import styles from './ExecuteCommandTab.less';

const ExecuteCommandTab = createReactClass({
    displayName: 'ExecuteCommandTab',

    propTypes: {
        executeCommand: PropTypes.func,
        storeCommand: PropTypes.func,
        clients: PropTypes.array,
        currentClient: PropTypes.object,
        clientFetchInProgress: PropTypes.bool,
        currentResult: PropTypes.object,
        commandInProgress: PropTypes.bool,
        setClientConfiguration: PropTypes.func.isRequired,
        setTargetConfiguration: PropTypes.func.isRequired,
        setFunctionConfiguration: PropTypes.func.isRequired,
        clientConfig: PropTypes.object.isRequired,
        targetConfig: PropTypes.object.isRequired,
        functionConfig: PropTypes.object.isRequired
    },

    getCommand() {
        return _.assign({},
            this.props.clientConfig,
            this.getCurrentClient().allowsTargeting() ? this.props.targetConfig : {},
            this.props.functionConfig
        );
    },

    onSubmit() {
        this.props.executeCommand(this.getCommand());
        var timestamp = new Date();
        this.props.storeCommand(timestamp, this.props.clientConfig, this.props.targetConfig, this.props.functionConfig);
    },

    getCurrentClient() {
        if (this.props.clientConfig.client) {
            return getClient(this.props.clientConfig.client, this.props.clients);
        }
        return this.props.clients[0];
    },

    renderTargetConfiguration() {
        var disabled = !this.getCurrentClient().allowsTargeting();
        if (disabled) return null;
        return (
            <TargetConfiguration
                config={this.props.targetConfig}
                disabled={disabled}
                onConfigChange={config => this.props.setTargetConfiguration(config)}
            />
        );
    },

    renderClientConfiguration() {
        return (
            <ClientConfiguration
                config={this.props.clientConfig}
                clients={this.props.clients}
                currentClient={this.getCurrentClient()}
                onConfigChange={config => this.props.setClientConfiguration(config)}
            />
        );
    },

    renderFunctionConfiguration() {
        return (
            <FunctionConfiguration
                config={this.props.functionConfig}
                currentClient={this.getCurrentClient()}
                onConfigChange={config => this.props.setFunctionConfiguration(config)}
            />
        );
    },

    renderResult() {
        var result = this.props.currentResult ? this.props.currentResult.return[0] : null;
        var progress = this.props.commandInProgress;

        if (progress) {
            return (
                <div className={styles.loadingIndicator}>
                    <LoadingIndicator>
                        job is executed, waiting for job result
                    </LoadingIndicator>
                </div>
            );
        }

        return (
            <CommandDisplay
                command={result === null ? 'no job result yet...' : result}
                downloadEnabled
            />);
    },

    handleShortcuts(action) {
        switch (action){
            case 'SUBMIT':
                this.onSubmit();
                return;
        }
    },

    render() {
        if (this.props.clientFetchInProgress) {
            return (
                <LoadingIndicator>
                    loading client configuration
                </LoadingIndicator>
            );
        }

        if (!this.props.clients) {
            return (
                <div>
                    clients not loaded
                </div>
            );
        }

        return (
                <div className={classnames(tabStyle.this, styles.this)}>
                    {this.renderClientConfiguration()}
                    {this.renderTargetConfiguration()}
                    {this.renderFunctionConfiguration()}
                    <div className={styles.submit}>
                        <RaisedButton
                            disabled={this.props.commandInProgress}
                            label='Submit'
                            primary={true}
                            onClick={this.onSubmit}
                            />
                    </div>
                    {this.renderResult()}
                </div>
        );
    }
});

function select(state) {
    var clients = state.Capabilities.capabilities ? getClients(state.Capabilities.capabilities.clients) : null;
    return {
        clients,
        currentClient: clients ? clients[0] : null,
        clientFetchInProgress: state.Capabilities.inProgress,
        currentResult: state.Commands.result,
        commandInProgress: state.Commands.inProgress,
        clientConfig: state.Commands.clientConfig,
        targetConfig: state.Commands.targetConfig,
        functionConfig: state.Commands.functionConfig
    };
}

export default connect(select, { executeCommand, storeCommand, setClientConfiguration,
    setTargetConfiguration, setFunctionConfiguration })(ExecuteCommandTab);
