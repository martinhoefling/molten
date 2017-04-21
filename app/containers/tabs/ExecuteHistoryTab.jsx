import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import RaisedButton from 'material-ui/RaisedButton';

import ExecutedCommand from 'components/execute/ExecutedCommand';
import { getClients } from 'models/Clients';
import { clearCommand, clearCommands,
    setClientConfiguration, setTargetConfiguration, setFunctionConfiguration } from 'ActionCreators';
import Constants from 'Constants';

import styles from './ExecuteHistoryTab.less';

const ExecuteHistoryTab = createReactClass({
    displayName: 'ExecuteHistoryTab',

    propTypes: {
        commandHistory: PropTypes.array.isRequired,
        clients: PropTypes.array,
        clearCommand: PropTypes.func.isRequired,
        clearCommands: PropTypes.func.isRequired,
        setClientConfiguration: PropTypes.func.isRequired,
        setTargetConfiguration: PropTypes.func.isRequired,
        setFunctionConfiguration: PropTypes.func.isRequired,
        push: PropTypes.func.isRequired
    },

    loadCommand(command) {
        this.props.setClientConfiguration(command.clientConfig);
        this.props.setTargetConfiguration(command.targetConfig);
        this.props.setFunctionConfiguration(command.functionConfig);
        this.props.push(Constants.URL.ROOT + 'execute/command');
    },

    removeCommand(command) {
        this.props.clearCommand(command);
    },

    render() {
        if (!this.props.clients || this.props.clients.length === 0) {
            return <div>Clients not loaded</div>;
        }
        return (
            <div>
                <div className={styles.button}>
                    <RaisedButton
                        label='Clear Command History'
                        primary={true}
                        onClick={() => this.props.clearCommands()}
                    />
                </div>
                {this.props.commandHistory.map(command =>
                    <ExecutedCommand
                        key={JSON.stringify(command)}
                        command={command}
                        clients={this.props.clients}
                        onLoadCommand={this.loadCommand}
                        onRemoveCommand={this.removeCommand}
                    />
                    )}
            </div>
        );
    }
});

function select(state) {
    const clients = state.Capabilities.capabilities ? getClients(state.Capabilities.capabilities.clients) : null;

    return {
        commandHistory: state.CommandHistory,
        clients
    };
}

export default connect(select, { clearCommand, clearCommands, push,
    setClientConfiguration, setTargetConfiguration, setFunctionConfiguration })(ExecuteHistoryTab);
