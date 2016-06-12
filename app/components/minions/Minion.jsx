import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import Paper from 'material-ui/lib/paper';
import RaisedButton from 'material-ui/lib/raised-button';

import StructuredElement from 'elements/StructuredElement';
import { executeCommand } from 'ActionCreators';

import rowStyles from 'components/RowLayout.less';
import styles from './Minion.less';

const Event = React.createClass({
    propTypes: {
        minion: React.PropTypes.object.isRequired,
        commandInProgress: React.PropTypes.bool.isRequired,
        minionJobs: React.PropTypes.array.isRequired,
        jobResults: React.PropTypes.object.isRequired,
        executeCommand: React.PropTypes.func.isRequired
    },

    getInitialState() {
        return {
            pillarLoadRequested: false,
            highstateRequested: false
        };
    },

    onLoadPillar() {
        var lowstate = { client: 'local', tgt: this.props.minion.id, fun: 'pillar.items' };
        this.props.executeCommand(lowstate);
        this.setState({ pillarLoadRequested: true });
    },

    onRequestHighstate() {
        var lowstate = { client: 'local', tgt: this.props.minion.id, fun: 'state.highstate', kwarg: 'queue=true' };
        this.props.executeCommand(lowstate);
        this.setState({ highstateRequested: true });
    },

    onRequestReload() {
        if (this.state.pillarLoadRequested) {
            var lowstate = { client: 'local', tgt: this.props.minion.id, fun: 'pillar.items' };
            this.props.executeCommand(lowstate);
        }
        var lowstate = { client: 'local', tgt: this.props.minion.id, fun: 'grains.items' };
        this.props.executeCommand(lowstate);
    },

    getLatestJob(funcName) {
        var filteredJobs = this.props.minionJobs.filter(job => job.Function === funcName);
        if (filteredJobs.length) {
            var jid = filteredJobs[0].jid;
            return this.props.jobResults[jid] || {};
        }
        return null;
    },

    renderHeader() {
        return (
            <div className={classnames(styles.header)}>
                <div>
                    <span className={styles.minionlabel}>Minion:</span>
                    <span>{this.props.minion.id}</span>
                </div>
            </div>
        );
    },

    renderPillarElement() {
        var pillar = this.getLatestJob('pillar.items');
        if (pillar) {
            return (
                <StructuredElement
                    downloadEnabled
                    arrayCollapseLimit={0}
                    data={{ pillar }}
                />
            );
        }
        return null;
    },

    renderRecentJobs() {
        var recentJobs = this.props.minionJobs;
        if (recentJobs) {
            return (
                <StructuredElement
                    downloadEnabled
                    arrayCollapseLimit={0}
                    data={{ 'recent jobs': recentJobs }}
                />
            );
        }
        return null;
    },

    renderHighstate() {
        var highstate = this.getLatestJob('state.highstate');
        if (highstate) {
            return (
                <StructuredElement
                    downloadEnabled
                    arrayCollapseLimit={0}
                    data={{ highstate }}
                />
            );
        }
        return null;
    },

    renderBody() {
        return (
            <div className={styles.body}>
                {this.renderGrainsElement()}
                {this.renderPillarElement()}
                {this.renderHighstate()}
                {this.renderRecentJobs()}
                {this.renderButtons()}
            </div>
        );
    },

    renderGrainsElement() {
        var grains = this.getLatestJob('grains.items')[this.props.minion.id] || this.props.minion.grains;
        return (
            <StructuredElement
                downloadEnabled
                arrayCollapseLimit={0}
                data={{ grains }}/>
        );
    },

    renderButtons() {
        return (
            <div>
                <div className={styles.button}>
                    <RaisedButton
                        disabled={this.state.pillarLoadRequested}
                        label='Load Pillar'
                        primary={true}
                        onClick={this.onLoadPillar}
                        />
                </div>
                <div className={styles.button}>
                    <RaisedButton
                        disabled={this.state.highstateRequested}
                        label='Highstate'
                        primary={true}
                        onClick={this.onRequestHighstate}
                        />
                </div>
                <div className={styles.button}>
                    <RaisedButton
                        disabled={this.props.commandInProgress}
                        label='Reload Minion Pillar / Grains'
                        primary={true}
                        onClick={this.onRequestReload}
                        />
                </div>
            </div>
        );
    },

    render() {
        return (
            <Paper className={classnames(rowStyles.this, styles.this)} zDepth={2}>
                {this.renderHeader()}
                {this.renderBody()}
            </Paper>
        );
    }
});

function select(state, ownProps) {
    var sortedJobs = Object.keys(state.Jobs.jobs)
        .map(key => (state.Jobs.jobs[key])).sort(function(a, b) {
            return b.jid - a.jid;
        });
    var minionJobs = sortedJobs.filter(function (job) {
        if (!job.Minions) {
            return false;
        }
        return _.contains(job.Minions, ownProps.minion.id);
    });

    return {
        minionJobs,
        commandInProgress: state.Commands.inProgress,
        jobResults: state.Jobs.jobResults
    };
}

export default connect(select, { executeCommand })(Event);
