var React = require('react');
var _ = require('lodash');
var classnames = require('classnames');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var ValidatedTextField = require('elements/ValidatedTextField');
var SearchDisplay = require('components/execute/SearchDisplay');

var rowStyles = require('components/RowLayout.less');
var styles = require('./FunctionConfiguration.less');

var FUNC_WITH_TRAILING_WS_REGEX = /([\w\.]+)(\s+)/;

var RunnerConfiguration = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('DocumentationStore')],

    propTypes: {
        config: React.PropTypes.object.isRequired,
        currentClient: React.PropTypes.object.isRequired,
        onConfigChange: React.PropTypes.func.isRequired
    },

    getStateFromFlux() {
        var flux = this.getFlux();
        var doc = flux.stores.DocumentationStore.getAvailableDocumentation();
        return {
            availableDocumentation: doc
        };
    },

    getInitialState() {
        return {
            functionInput: this.props.config.fun
        };
    },

    getConfig(options) {
        var returnObj = this.props.config,
            newOptions = {};
        if ('arg' in options) {
            newOptions.arg = options.arg && options.arg.match(/\S+/g);
        }
        if ('kwarg' in options) {
            newOptions.kwarg = options.kwarg && _.zipObject(options.kwarg
                        .replace(/\s*=\s*/g, '=')
                        .match(/\S+/g).map(value => value.split('='))
                );
        }
        return _.omit(_.assign(returnObj, options),
                value => value === '' || value === {} || value === [] || value === undefined);
    },

    onValueChanged(configProperty, event, valid) {
        var value = event.target.value;
        var config = this.getConfig({});
        if (valid || !value) {
            config = this.getConfig({ [configProperty]: value });
        }
        this.props.onConfigChange(config);
    },

    onFunctionChange(event, valid) {
        this.setState({ functionInput: event.target.value });
        if (event.target.value.match(FUNC_WITH_TRAILING_WS_REGEX)) {
            event.target.value = event.target.value.match(FUNC_WITH_TRAILING_WS_REGEX)[1];
            this.refs.argumentInput.focus();
        }
        this.onValueChanged('fun', event, valid);
    },

    onFunctionSelect(selectedFunction) {
        this.refs.functionInput.setValue(selectedFunction);
        this.setState({ functionInput: selectedFunction });
        this.props.onConfigChange(this.getConfig({ fun: selectedFunction }));
    },

    renderFunctionSearch() {
        var store = this.getFlux().stores.DocumentationStore;
        var docType = this.props.currentClient.getDocType();
        var documentation = store.searchFunctionDocumentation(docType, this.state.functionInput);
        return (
            <SearchDisplay
                search={documentation}
                onFunctionSelect={this.onFunctionSelect}
                />
        );
    },

    renderInputs() {
        var arg = this.props.config.arg;
        var argstr = (arg && arg.join) ? arg.join(',') : '';
        var kwarg =  this.props.config.kwarg;
        var kwargstr = _.map(kwarg, (value, key) => key + ' = ' + value).join('\n');

        return (
            <div className={styles.configuration}>
                <ValidatedTextField
                    ref='functionInput'
                    hintText='Function, e.g. test.ping'
                    floatingLabelText='Function'
                    onChange={this.onFunctionChange}
                    validationRegexp={/^[\w\.]+\.[\w\.]+$/}
                    validationErrorMsg='invalid function'
                    defaultValue={this.props.config.fun}
                    />
                <ValidatedTextField
                    ref='argumentInput'
                    hintText='Arguments as list'
                    floatingLabelText='Arguments'
                    multiLine={true}
                    onChange={this.onValueChanged.bind(this, 'arg')}
                    validationRegexp={/^\S+(\s+\S+)*\s*$/}
                    validationErrorMsg='invalid arguments'
                    defaultValue={argstr}
                    />
                <ValidatedTextField
                    hintText='e.g. saltenv="stable"'
                    floatingLabelText='Keyword Arguments'
                    multiLine={true}
                    onChange={this.onValueChanged.bind(this, 'kwarg')}
                    validationRegexp={/^(\S+\s*=\s*\S+)(\s+\S+\s*=\s*\S+)*\s*$/}
                    validationErrorMsg='invalid keyword args'
                    defaultValue={kwargstr}
                    />
            </div>
        );
    },

    render() {
        return (
            <div className={classnames(rowStyles.this, styles.this)}>
                {this.renderInputs()}
                <div className={styles.documentation}>
                    {this.renderFunctionSearch()}
                </div>
            </div>
        );
    }
});

module.exports = RunnerConfiguration;
