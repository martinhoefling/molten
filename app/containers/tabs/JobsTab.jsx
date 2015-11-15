var React = require('react');
var moment = require('moment');
var connect = require('react-redux').connect;

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
    propTypes: {
        jobs: React.PropTypes.array.isRequired,
        fetchInProgress: React.PropTypes.bool.isRequired
    },

    getInitialState() {
        return {
            fromDate: new Date(UTCNow().valueOf() - DEFAULT_TIME_RANGE),
            toDate: undefined
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

        var filteredJobs = this.props.jobs.filter(function (job) {
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
        if (this.props.fetchInProgress) {
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

function compareJIDs(a, b) {
    if (a.jid < b.jid) {
        return -1;
    }
    if (a.jid > b.jid) {
        return 1;
    }
    return 0;
}

function select(state) {
    return {
        jobs: Object.keys(state.Jobs.jobs).map(key => (state.Jobs.jobs[key])).sort(compareJIDs),
        fetchInProgress: state.Jobs.fetchingJobsInProgress
    };
}

module.exports = connect(select)(JobsTab);
