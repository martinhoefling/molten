var React = require('react');
var _ = require('lodash');
var classnames = require('classnames');
var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;
var RaisedButton = require('material-ui/lib/raised-button');
var ClientConfiguration = require('components/execute/ClientConfiguration');
var TargetConfiguration = require('components/execute/TargetConfiguration');
var FunctionConfiguration = require('components/execute/FunctionConfiguration');
var CommandDisplay = require('components/execute/CommandDisplay');
var LoadingIndicator = require('elements/LoadingIndicator');

var localStore = require('helpers/localstore');

var tabStyle = require('./Tab.less');
var styles = require('./ExecuteTab.less');

var ExecuteTab = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('CapabilityStore', 'CommandStore')],

    getInitialState() {
        var clientConfig = localStore.get('clientConfig') || { client: 'local' };
        var targetConfig = localStore.get('targetConfig') || { tgt: '*' };
        var functionConfig = localStore.get('functionConfig') || { fun: 'grains.items' };
        return {
            clientConfig, targetConfig, functionConfig
        };
    },

    getStateFromFlux: function () {
        var flux = this.getFlux();
        var capabilityStore = flux.stores.CapabilityStore;
        var clients = capabilityStore.getClients();
        var commandResult = flux.stores.CommandStore.getCommandResult();
        return {
            clients: clients,
            currentClient: clients ? clients[0] : null,
            currentResult: commandResult,
            clientFetchInProgress: capabilityStore.fetchInProgress()
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
        var lowstate = this.getCommand();
        this.getFlux().actions.submitCommand(lowstate);
    },

    getCurrentClient() {
        if (this.state.clientConfig.client) {
            var spl = this.state.clientConfig.client.split('_');
            var name = spl[0];
            var client = _.find(this.state.clients, client => client.getName() === name);
            var mode = spl[1] || null;
            client.setMode(mode);
            return client;
        }
        return this.state.clients[0];
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
        var result = this.state.currentResult ? this.state.currentResult.return[0] : null;
        var progress = this.getFlux().stores.CommandStore.inProgress();

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
        if (this.state.clientFetchInProgress) {
            return (
                <LoadingIndicator>
                    loading client configuration
                </LoadingIndicator>
            );
        }

        if (!this.state.clients) {
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
                    clients={this.state.clients}
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
                        disabled={this.getFlux().stores.CommandStore.inProgress()}
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

module.exports = ExecuteTab;
