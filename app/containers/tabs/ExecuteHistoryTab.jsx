import React from 'react';
import { connect } from 'react-redux';

import ExecutedCommand from 'components/execute/ExecutedCommand';
import { getClients } from 'models/Clients';

const ExecuteHistoryTab = React.createClass({
    propTypes: {
        commandHistory: React.PropTypes.array.isRequired,
        clients: React.PropTypes.array
    },

    render() {
        if (!this.props.clients || this.props.clients.length === 0) {
            return <div>Clients not loaded</div>;
        }
        return (
            <div>
                {this.props.commandHistory.map(command =>
                    <ExecutedCommand key={JSON.stringify(command)} command={command} clients={this.props.clients}/>)}
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

export default connect(select)(ExecuteHistoryTab);
