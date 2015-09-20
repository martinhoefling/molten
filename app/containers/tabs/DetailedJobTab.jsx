var React = require('react');
var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;
var LoadingIndicator = require('elements/LoadingIndicator');
var StructuredElement = require('elements/StructuredElement');

var tabStyle = require('./Tab.less');
var styles = require('./DetailedJobTab.less');

var DetailedJobTab = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('JobStore')],

    propTypes: {
        params: React.PropTypes.object
    },

    getStateFromFlux() {
        var flux = this.getFlux();
        var jid = this.props.params.jid;
        var jobStore = flux.stores.JobStore;
        var job = jobStore.getJob(jid);
        var result = jobStore.getJobResult(jid);
        var fetchInProgress = jobStore.fetchingJobInProgress(jid);
        return {
            job,
            result,
            fetchInProgress
        };
    },

    componentWillMount() {
        if (!this.state.result) {
            this.getFlux().actions.loadJobResult(this.props.params.jid);
        }
    },

    renderJob() {
        return (
            <div className={styles.jobSummary}>
                <div className={styles.informationHeader}>Job information for {this.state.job.jid}:</div>
                <StructuredElement downloadEnabled element={this.state.job}/>
                <div className={styles.resultsHeader}>Results of {this.state.job.jid}:</div>
                <StructuredElement downloadEnabled element={this.state.result || {} }/>
            </div>
        );
    },

    render() {
        if (this.state.fetchInProgress) {
            return (
                <LoadingIndicator>
                    Loading Job {this.props.params.jid}
                </LoadingIndicator>
            );
        }
        return (
            <div className={tabStyle.this}>
                {this.renderJob()}
            </div>
        );
    }
});

module.exports = DetailedJobTab;
