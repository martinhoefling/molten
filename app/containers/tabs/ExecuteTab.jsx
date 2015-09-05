var React = require('react');
var _ = require('lodash');
var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;
var RaisedButton = require('material-ui/lib/raised-button');
var ClientConfiguration = require('components/execute/ClientConfiguration');
var TargetConfiguration = require('components/execute/TargetConfiguration');
var FunctionConfiguration = require('components/execute/FunctionConfiguration');
var CommandDisplay = require('components/execute/CommandDisplay');

var tabStyle = require('./Tab.less');
var styles = require('./ExecuteTab.less');

var ExecuteTab = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('CapabilityStore', 'CommandStore')],

    getInitialState() {
        return {
            clientConfig: {
                client: 'local'
            },
            targetConfig: {
                tgt: '*'
            },
            functionConfig: {
                fun: 'grains.items'
            }
        };
    },

    getStateFromFlux: function () {
        var flux = this.getFlux();
        var clients = flux.stores.CapabilityStore.getClients();
        var commandResult = flux.stores.CommandStore.getCommandResult();
        return {
            clients: clients,
            currentClient: clients ? clients[0] : null,
            currentResult: commandResult
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

    render() {
        if (!this.state.clients) {
            return (
                <div>loading client configuration</div>
            );
        }

        var currentClient = this.getCurrentClient();
        var result = this.state.currentResult ? this.state.currentResult.return[0] :
            (this.getFlux().stores.CommandStore.inProgress() ? 'job submitted / in progress' : 'no results yet');

        return (
            <div className={tabStyle.this}>
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
                <CommandDisplay
                    command={this.getCommand()}
                    />
                <div className={styles.submit}>
                    <RaisedButton
                        disabled={this.getFlux().stores.CommandStore.inProgress()}
                        label='Submit'
                        primary={true}
                        onClick={this.onSubmit}
                        />
                </div>
                <CommandDisplay
                    command={result}
                    />
            </div>
        );
    }
});

module.exports = ExecuteTab;
