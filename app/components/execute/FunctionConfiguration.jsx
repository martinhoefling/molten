import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import classnames from 'classnames';
import Paper from 'material-ui/lib/paper';

import ValidatedTextField from 'elements/ValidatedTextField';
import SearchDisplay from 'components/execute/SearchDisplay';
import { searchFunctionDocumentation } from 'helpers/docparse';

import rowStyles from 'components/RowLayout.less';
import styles from './FunctionConfiguration.less';

const FUNC_WITH_TRAILING_WS_REGEX = /([\w\.]+)(\s+)/;

const FunctionConfiguration = React.createClass({
    propTypes: {
        config: React.PropTypes.object.isRequired,
        currentClient: React.PropTypes.object.isRequired,
        onConfigChange: React.PropTypes.func.isRequired,
        documentation: React.PropTypes.object
    },

    getInitialState() {
        return {
            functionInput: this.props.config.fun
        };
    },

    getConfig(options) {
        var returnObj = this.props.config,
            newOptions = {};
        if ('fun' in options) {
            newOptions.fun = options.fun;
        }
        if ('arg' in options) {
            newOptions.arg = options.arg && options.arg.match(/\S+/g);
        }
        if ('kwarg' in options) {
            newOptions.kwarg = options.kwarg && _.zipObject(options.kwarg
                        .replace(/\s*=\s*/g, '=')
                        .match(/\S+/g).map(value => value.split('='))
                );
        }
        return _.omit(_.assign(returnObj, newOptions),
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
            this.setState({ functionInput: event.target.value });
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
        var docType = this.props.currentClient.getDocType();
        var documentation = searchFunctionDocumentation(
            this.props.documentation, docType, this.state.functionInput);
        return (
            <SearchDisplay
                search={documentation}
                onFunctionSelect={this.onFunctionSelect}
                />
        );
    },

    renderInputs() {
        var arg = this.props.config.arg;
        var argstr = (arg || []).join(' ');
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
                    style={{ 'max-width': '220px' }}
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
                    style={{ 'max-width': '220px' }}
                />
                <ValidatedTextField
                    hintText='e.g. saltenv="stable"'
                    floatingLabelText='Keyword Arguments'
                    multiLine={true}
                    onChange={this.onValueChanged.bind(this, 'kwarg')}
                    validationRegexp={/^(\S+\s*=\s*\S+)(\s+\S+\s*=\s*\S+)*\s*$/}
                    validationErrorMsg='invalid keyword args'
                    defaultValue={kwargstr}
                    style={{ 'max-width': '220px' }}
                />
            </div>
        );
    },

    render() {
        return (
            <Paper className={classnames(rowStyles.this, styles.this)} Depth={2}>
                {this.renderInputs()}
                <div className={styles.documentation}>
                    {this.renderFunctionSearch()}
                </div>
            </Paper>
        );
    }
});

function select(state) {
    return {
        documentation: state.Documentation.documentation
    };
}

export default connect(select)(FunctionConfiguration);
