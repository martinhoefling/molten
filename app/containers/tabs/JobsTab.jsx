import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

import LoadingIndicator from 'elements/LoadingIndicator';
import JobSummary from 'components/jobs/JobSummary';
import DateTimePicker from 'elements/DateTimePicker';

import tabStyle from './Tab.less';
import styles from './JobsTab.less';

const DEFAULT_TIME_RANGE = 60 * 10 * 1000; // 10 Minutes

function UTCNow() {
    var loc = new Date();
    return new Date(loc.valueOf() + 60000 * loc.getTimezoneOffset());
}

const JobsTab = createReactClass({
    displayName: 'JobsTab',

    propTypes: {
        jobs: PropTypes.array.isRequired,
        fetchInProgress: PropTypes.bool.isRequired
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

function select(state) {
    return {
        jobs: Object.keys(state.Jobs.jobs)
            .map(key => (state.Jobs.jobs[key])).sort(function(a, b) {
                return b.jid - a.jid;
            }),
        fetchInProgress: state.Jobs.fetchingJobsInProgress
    };
}

export default connect(select)(JobsTab);

