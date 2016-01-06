import React from 'react';
import classnames from 'classnames';

import Paper from 'material-ui/lib/paper';

import { getClient } from 'models/Clients';

import styles from './ExecutedCommand.less';

const ExecutedCommand = React.createClass({
    propTypes: {
        command: React.PropTypes.object.isRequired,
        clients: React.PropTypes.array.isRequired
    },

    renderFunction() {
        return <span className='function'>{this.props.command.functionConfig.fun}</span>;
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
                executions: <span className='execution-count'>{this.props.command.timestamps.length}</span>
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

    renderBody() {
        return (
            <div className='body'>

            </div>
        );
    },

    renderFooter() {
        return (
            <div className='footer'>

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
