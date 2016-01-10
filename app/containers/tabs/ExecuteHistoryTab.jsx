import React from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';

import RaisedButton from 'material-ui/lib/raised-button';

import ExecutedCommand from 'components/execute/ExecutedCommand';
import { getClients } from 'models/Clients';
import { clearCommand, clearCommands,
    setClientConfiguration, setTargetConfiguration, setFunctionConfiguration } from 'ActionCreators';
import Constants from 'Constants';

import styles from './ExecuteHistoryTab.less';

const ExecuteHistoryTab = React.createClass({
    propTypes: {
        commandHistory: React.PropTypes.array.isRequired,
        clients: React.PropTypes.array,
        clearCommand: React.PropTypes.func.isRequired,
        clearCommands: React.PropTypes.func.isRequired,
        setClientConfiguration: React.PropTypes.func.isRequired,
        setTargetConfiguration: React.PropTypes.func.isRequired,
        setFunctionConfiguration: React.PropTypes.func.isRequired,
        pushState: React.PropTypes.func.isRequired
    },

    loadCommand(command) {
        this.props.setClientConfiguration(command.clientConfig);
        this.props.setTargetConfiguration(command.targetConfig);
        this.props.setFunctionConfiguration(command.functionConfig);
        this.props.pushState(null, Constants.URL.ROOT + 'execute/command');
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
    var clients = state.Capabilities.capabilities ? getClients(state.Capabilities.capabilities.clients) : null;

    return {
        commandHistory: state.CommandHistory,
        clients
    };
}

export default connect(select, { clearCommand, clearCommands, pushState,
    setClientConfiguration, setTargetConfiguration, setFunctionConfiguration })(ExecuteHistoryTab);
