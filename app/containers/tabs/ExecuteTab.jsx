var React = require('react');
var connect = require('react-redux').connect;

var _ = require('lodash');
var Clients = require('models/Clients');

var classnames = require('classnames');

var RaisedButton = require('material-ui/lib/raised-button');
var ClientConfiguration = require('components/execute/ClientConfiguration');
var TargetConfiguration = require('components/execute/TargetConfiguration');
var FunctionConfiguration = require('components/execute/FunctionConfiguration');
var CommandDisplay = require('components/execute/CommandDisplay');
var LoadingIndicator = require('elements/LoadingIndicator');
var actionCreators = require('ActionCreators');

var localStore = require('helpers/localstore');

var tabStyle = require('./Tab.less');
var styles = require('./ExecuteTab.less');

var ExecuteTab = React.createClass({
    propTypes: {
        executeCommand: React.PropTypes.func,
        clients: React.PropTypes.array,
        currentClient: React.PropTypes.object,
        clientFetchInProgress: React.PropTypes.bool,
        currentResult: React.PropTypes.object,
        commandInProgress: React.PropTypes.bool
    },

    getInitialState() {
        var clientConfig = localStore.get('clientConfig') || { client: 'local' };
        var targetConfig = localStore.get('targetConfig') || { tgt: '*' };
        var functionConfig = localStore.get('functionConfig') || { fun: 'grains.items' };
        return {
            clientConfig, targetConfig, functionConfig
        };
    },

    getCommand() {
        return _.assign({},
            this.state.clientConfig,
            this.getCurrentClient().allowsTargeting() ? this.state.targetConfig : {},
            this.state.functionConfig
        );
    },

    onSubmit() {
        this.props.executeCommand(this.getCommand());
    },

    getCurrentClient() {
        if (this.state.clientConfig.client) {
            var spl = this.state.clientConfig.client.split('_');
            var name = spl[0];
            var client = _.find(this.props.clients, client => client.getName() === name);
            var mode = spl[1] || null;
            client.setMode(mode);
            return client;
        }
        return this.props.clients[0];
    },

    renderTargetConfiguration() {
        var disabled = !this.getCurrentClient().allowsTargeting();
        if (disabled) return null;
        return (
            <TargetConfiguration
                config={this.state.targetConfig}
                disabled={disabled}
                onConfigChange={config => this.setState({ targetConfig: config })}
            />
        );
    },

    componentWillUpdate(nextProps, nextState) {
        localStore.set('clientConfig', nextState.clientConfig);
        localStore.set('targetConfig', nextState.targetConfig);
        localStore.set('functionConfig', nextState.functionConfig);
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

        var currentClient = this.getCurrentClient();

        return (
            <div className={classnames(tabStyle.this, styles.this)}>
                <ClientConfiguration
                    config={this.state.clientConfig}
                    clients={this.props.clients}
                    currentClient={currentClient}
                    onConfigChange={config => this.setState({ clientConfig: config })}
                    />
                {this.renderTargetConfiguration()}
                <FunctionConfiguration
                    config={this.state.functionConfig}
                    currentClient={currentClient}
                    onConfigChange={config => this.setState({ functionConfig: config })}
                    />
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
    var clients = state.Capabilities.capabilities ? Clients.getClients(state.Capabilities.capabilities.clients) : null;
    return {
        clients,
        currentClient: clients ? clients[0] : null,
        clientFetchInProgress: state.Capabilities.inProgress,
        currentResult: state.Commands.result,
        commandInProgress: state.Commands.inProgress
    };
}

module.exports = connect(select, { executeCommand: actionCreators.executeCommand })(ExecuteTab);
