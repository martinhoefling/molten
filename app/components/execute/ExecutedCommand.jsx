import React from 'react';
import classnames from 'classnames';

import Paper from 'material-ui/lib/paper';
import RaisedButton from 'material-ui/lib/raised-button';

import { getClient, MODE } from 'models/Clients';
import StructuredElement from 'elements/StructuredElement';

import styles from './ExecutedCommand.less';

const ExecutedCommand = React.createClass({
    propTypes: {
        command: React.PropTypes.object.isRequired,
        clients: React.PropTypes.array.isRequired,
        onLoadCommand: React.PropTypes.func.isRequired,
        onRemoveCommand: React.PropTypes.func.isRequired
    },

    renderFunction() {
        return <span className='function'>Function: {this.props.command.functionConfig.fun}</span>;
    },

    renderArguments() {
        var cfg = this.props.command.functionConfig;
        var argstr = cfg.arg ? cfg.arg.join(' ') : null;
        var kwargstr = cfg.kwarg ? _.map(cfg.kwarg, (value, key) => key + ' = ' + value).join(' ') : null;
        var fullstr = '';
        if (argstr) {
            fullstr = argstr;
            if (kwargstr) {
                fullstr = [argstr, kwargstr].join(' ');
            }
        }
        if (kwargstr && !argstr) {
            fullstr = kwargstr;
        }
        return <span className='arguments'>{fullstr}</span>;
    },

    renderTarget() {
        if (getClient(this.props.command.clientConfig.client, this.props.clients).allowsTargeting()) {
            var targetConfig = this.props.command.targetConfig;
            if (targetConfig.expr_form && targetConfig.expr_form !== 'glob') {
                return <span className='target'>Target: {targetConfig.tgt} ({targetConfig.expr_form})</span>;
            }
            return <span className='target'>Target: {targetConfig.tgt}</span>;
        }
        return null;
    },

    renderExecutionCount() {
        return (
            <span>
                Executions: <span className='execution-count'>{this.props.command.timestamps.length}</span>
            </span>
        );
    },

    renderHeader() {
        return (
            <div className='header'>
                <div className='header-col'>{this.renderFunction()} {this.renderArguments()}</div>
                <div className='header-col'>{this.renderTarget()}</div>
                <div className='header-col'>{this.renderExecutionCount()}</div>
            </div>
        );
    },

    renderArguments(name, obj) {
        if (obj) {
            return (
                <div className='body-element'>
                    <StructuredElement element={{ [name]: obj }}/>
                </div>
            );
        }
        return null;
    },

    renderBody() {
        var command = this.props.command;
        var ret = command.targetConfig.ret;
        var timeout = command.clientConfig.timeout;
        var mode = getClient(this.props.command.clientConfig.client, this.props.clients).getMode();
        var args = command.functionConfig.arg;
        var kwargs = command.functionConfig.kwarg;
        var summary = {
            Asynchronous: mode === MODE.ASYNC ? 'yes' : 'no'
        };

        if (mode === MODE.BATCH) {
            summary['Batched Execution'] = command.clientConfig.batch;
        }
        if (timeout) {
            summary.Timeout = timeout;
        }
        if (ret) {
            summary.Returner = ret;
        }
        return (
            <div className='body'>
                <div className='body-element'>
                    <StructuredElement element={summary}/>
                </div>
                {this.renderArguments('Arguments', args)}
                {this.renderArguments('Keyword Arguments', kwargs)}
            </div>
        );
    },

    renderFooter() {
        return (
            <div className='footer'>
                <div className={styles.button}>
                    <RaisedButton
                        label='Load Command'
                        primary={true}
                        onClick={() => this.props.onLoadCommand(this.props.command)}
                    />
                </div>
                <div className={styles.button}>
                    <RaisedButton
                        label='Remove Command'
                        primary={true}
                        onClick={() => this.props.onRemoveCommand(this.props.command)}
                    />
                </div>
            </div>
        );
    },

    render() {
        return (
            <Paper className={classnames(styles.this)} zDepth={2}>
                {this.renderHeader()}
                {this.renderBody()}
                {this.renderFooter()}
            </Paper>
        );
    }
});

export default ExecutedCommand;
