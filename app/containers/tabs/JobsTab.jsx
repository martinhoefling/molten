var React = require('react');
var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;
var LoadingIndicator = require('elements/LoadingIndicator');

var JobSummary = require('components/jobs/JobSummary');

var tabStyle = require('./Tab.less');

var JobsTab = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('JobStore')],

    getStateFromFlux() {
        var flux = this.getFlux();
        var jobStore = flux.stores.JobStore;
        var jobs = jobStore.getJobs();
        return {
            jobs,
            fetchInProgress: jobStore.fetchingJobsInProgress()
        };
    },

    renderJobs() {
        return this.state.jobs.map(job => <JobSummary key={job.id} job={job}/>);
    },

    render() {
        if (this.state.fetchInProgress) {
            return (
                <LoadingIndicator>
                    Loading Jobs
                </LoadingIndicator>
            );
        }
        return (
            <div className={tabStyle.this}>
                {this.renderJobs()}
            </div>
        );
    }
});

module.exports = JobsTab;
