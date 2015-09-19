var React = require('react');
var Fluxxor = require('fluxxor');
var moment = require('moment');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;
var LoadingIndicator = require('elements/LoadingIndicator');

var JobSummary = require('components/jobs/JobSummary');
var DateTimePicker = require('elements/DateTimePicker');

var tabStyle = require('./Tab.less');
var styles = require('./JobsTab.less');

var DEFAULT_TIME_RANGE = 60 * 10 * 1000; // 10 Minutes

function UTCNow() {
    var loc = new Date();
    return new Date(loc.valueOf() + 60000 * loc.getTimezoneOffset());
}

var JobsTab = React.createClass({
    mixins: [FluxMixin, StoreWatchMixin('JobStore')],

    getInitialState() {
        return {
            fromDate: new Date(UTCNow().valueOf() - DEFAULT_TIME_RANGE),
            toDate: undefined
        };
    },

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
        var fromStr, toStr;
        if (this.state.fromDate) {
            fromStr = moment(this.state.fromDate).format('YYYYMMDDHHmmss') + '000000';
        }

        if (this.state.toDate) {
            toStr = moment(this.state.toDate).format('YYYYMMDDHHmmss') + '000000';
        }

        var filteredJobs = this.state.jobs.filter(function (job) {
            if (fromStr) {
                if (job.jid < fromStr) {
                    return false;
                }
            }
            if (toStr) {
                if (job.jid > toStr) {
                    return false;
                }
            }
            return true;
        });

        return filteredJobs.map(job => <JobSummary key={job.jid} job={job}/>);
    },

    renderHeader() {
        return (
            <div className={styles.header}>
                <DateTimePicker
                    labelText='From:'
                    datetime={this.state.fromDate}
                    onChange={fromDate => this.setState({ fromDate })}
                    />
                <DateTimePicker
                    labelText='To:'
                    datetime={this.state.toDate}
                    onChange={toDate => this.setState({ toDate })}
                    />
            </div>
        );
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
                {this.renderHeader()}
                {this.renderJobs()}
            </div>
        );
    }
});

module.exports = JobsTab;
