var React = require('react');
var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var Paper = require('material-ui/lib/paper');
var RaisedButton = require('material-ui/lib/raised-button');
var classnames = require('classnames');
var CollapsedStructuredElement = require('elements/CollapsedStructuredElement');

var rowStyles = require('components/RowLayout.less');
var styles = require('./Minion.less');

var Event = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('JobStore')],

    propTypes: {
        minion: React.PropTypes.object.isRequired
    },

    getInitialState() {
        return {
            pillarLoadRequested: false,
            highstateRequested: false
        };
    },

    getStateFromFlux() {
        var flux = this.getFlux();
        var jobStore = flux.stores.JobStore;
        var jobs = jobStore.getMinionJobs(this.props.minion.id);
        return {
            jobs
        };
    },

    onLoadPillar() {
        var lowstate = { client: 'local', tgt: this.props.minion.id, fun: 'pillar.items' };
        this.getFlux().actions.submitCommand(lowstate);
        this.setState({ pillarLoadRequested: true });
    },

    onRequestHighstate() {
        var lowstate = { client: 'local', tgt: this.props.minion.id, fun: 'state.highstate', kwarg: 'queue=true' };
        this.getFlux().actions.submitCommand(lowstate);
        this.setState({ highstateRequested: true });
    },

    getLatestJob(funcName) {
        var pillarJobs = this.state.jobs.filter(job => job.Function === funcName);
        if (pillarJobs.length) {
            var jid = _.last(pillarJobs).jid;
            return this.getFlux().stores.JobStore.getMinionJobResult(jid, this.props.minion.id);
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
                <CollapsedStructuredElement
                    arraysCollapsed={true}
                    element={{ pillar }}
                />
            );
        }
        return null;
    },

    renderRecentJobs() {
        var recentJobs = this.state.jobs;
        if (recentJobs) {
            return (
                <CollapsedStructuredElement
                    arraysCollapsed={true}
                    element={{ 'recent jobs': recentJobs }}
                />
            );
        }
        return null;
    },

    renderHighstate() {
        var highstate = this.getLatestJob('state.highstate');
        if (highstate) {
            return (
                <CollapsedStructuredElement
                    arraysCollapsed={true}
                    element={{ highstate }}
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
        return (
            <CollapsedStructuredElement
                arraysCollapsed={true}
                element={{ grains: this.props.minion.grains }}/>
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

module.exports = Event;
