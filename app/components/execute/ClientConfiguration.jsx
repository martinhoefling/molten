import React from 'react';
import classnames from 'classnames';

import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Paper from 'material-ui/lib/paper';
import ValidatedTextField from 'elements/ValidatedTextField';
import Checkbox from 'material-ui/lib/checkbox';

import { MODE }  from 'models/Clients';

import rowStyles from 'components/RowLayout.less';
import styles from './ClientConfiguration.less';

const ClientConfiguration = React.createClass({
    propTypes: {
        clients: React.PropTypes.array.isRequired,
        currentClient: React.PropTypes.object.isRequired,
        config: React.PropTypes.object.isRequired,
        onConfigChange: React.PropTypes.func.isRequired
    },

    onClientChange(event, index, client) {
        this.props.onConfigChange(this.getConfig(client));
    },

    onAsyncChange(event, checked) {
        var client = this.props.currentClient;
        client.setMode(checked ? MODE.ASYNC : MODE.NONE);
        this.props.onConfigChange(this.getConfig(client));
    },

    onTimeoutChange(event, valid) {
        var value = event.target.value;
        var config = this.getConfig(this.props.currentClient);
        if (valid || !value) {
            config = this.getConfig(this.props.currentClient, { timeout: value });
        }
        this.props.onConfigChange(config);
    },

    onBatchChange(event, valid) {
        var value = event.target.value;
        var client = this.props.currentClient;
        var config = this.getConfig(client);
        if (valid || !value) {
            client.setMode(value ? MODE.BATCH : MODE.NONE);
            config = this.getConfig(this.props.currentClient, { batch: value });
        }
        this.props.onConfigChange(config);
    },

    getDisabled(client) {
        var asynchronous = !client.hasMode(MODE.ASYNC);
        var asyncEnabled = !!(client.getMode() === MODE.ASYNC && !asynchronous);
        var batch = !client.hasMode(MODE.BATCH) || asyncEnabled || !!this.props.config.timeout;
        var timeout = asyncEnabled || (this.props.config.batch && !batch);

        return {
            asynchronous,
            batch,
            timeout
        };
    },

    getConfig(client, options) {
        var opts = options || {};
        var disabled = this.getDisabled(client);
        var clientName = client.getFullName();
        var returnObj = Object.create(null);
        var batch = opts.batch || opts.batch === '' ? opts.batch : this.props.config.batch;
        var timeout = opts.timeout || opts.timeout === '' ? opts.timeout : this.props.config.timeout;

        if (!disabled.async && client.getMode() === MODE.ASYNC) {
            clientName = client.getFullName();
        } else if (!disabled.batch && batch) {
            clientName = client.getFullName();
            returnObj['batch'] = batch;
        } else if (!disabled.timeout && timeout) {
            returnObj['timeout'] = timeout;
        }
        returnObj['client'] = clientName;
        return returnObj;
    },

    renderAsync() {
        if (!this.props.currentClient.hasMode(MODE.ASYNC)) {
            return null;
        }

        var disabled = this.getDisabled(this.props.currentClient);
        return (
            <Checkbox
                name='Async'
                value='async'
                label='Async'
                style={{
                    top: '-12px',
                    left: '40px',
                    width: '100px'
                }}
                labelStyle={{ width: '60px' }}
                disabled={disabled.async}
                checked={this.props.currentClient.getMode() === MODE.ASYNC}
                onCheck={this.onAsyncChange}/>
        );
    },

    renderBatch() {
        if (!this.props.currentClient.hasMode(MODE.BATCH)) {
            return null;
        }
        var disabled = this.getDisabled(this.props.currentClient);
        return (
            <ValidatedTextField
                ref='batchInput'
                hintText='e.g. 10% or 115'
                floatingLabelText={disabled.batch ? 'no batch support' : 'batch size'}
                disabled={disabled.batch}
                value={this.props.config.batch || ''}
                onChange={this.onBatchChange}
                style={{ maxWidth: '140px' }}
                validationRegexp={/^[0-9]+%?$/}
                validationErrorMsg='must be int or percentage'
                />
        );
    },

    renderTimeout() {
        var disabled = this.getDisabled(this.props.currentClient);

        return (
            <ValidatedTextField
                ref='timeoutInput'
                hintText='timeout in seconds'
                floatingLabelText={disabled.timeout ?  'no timeout support' : 'Timeout'}
                disabled={disabled.timeout}
                value={this.props.config.timeout || ''}
                onChange={this.onTimeoutChange}
                style={{ maxWidth: '140px' }}
                validationRegexp={/^[0-9]+$/}
                validationErrorMsg='invalid int'
                />
        );
    },

    renderClientSelectDropdown() {
        var clientMenuItems = this.props.clients.map(client => (
            <MenuItem value={client} primaryText={client.getName()} key={client.getName()}/>
        ));

        return (
            <div className={styles.client}>
                <SelectField
                    floatingLabelText='Client'
                    style={{ width: '100px' }}
                    value={this.props.currentClient}
                    onChange={this.onClientChange}>
                    {clientMenuItems}
                </SelectField>
           </div>
        );
    },

    render() {
        return (
            <Paper className={classnames(rowStyles.this, styles.this)} Depth={2}>
                <div className={styles.clientselect}>
                    {this.renderClientSelectDropdown()}
                    {this.renderAsync()}
                </div>
                {this.renderBatch()}
                {this.renderTimeout()}
            </Paper>
        );
    }
});

export default ClientConfiguration;
