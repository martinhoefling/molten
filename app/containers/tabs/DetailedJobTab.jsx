import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

import LoadingIndicator from 'elements/LoadingIndicator';
import StructuredElement from 'elements/StructuredElement';
import { loadJobResult } from 'ActionCreators';

import tabStyle from './Tab.less';
import styles from './DetailedJobTab.less';

const DetailedJobTab = React.createClass({

    propTypes: {
        params: React.PropTypes.object,
        job: React.PropTypes.object,
        result: React.PropTypes.object,
        fetchInProgress: React.PropTypes.bool.isRequired,
        loadJobResult: React.PropTypes.func.isRequired
    },

    componentWillMount() {
        if (_.isEmpty(this.props.result)) {
            this.props.loadJobResult(this.props.params.jid);
        }
    },

    renderJobData(data) {
        if (!data) {
            return 'job not found';
        }
        return <StructuredElement downloadEnabled data={data}/>;
    },

    renderJobResult(data) {
        if (!data) {
            return 'no result yet';
        }
        return <StructuredElement downloadEnabled data={data}/>;
    },

    renderJob() {
        return (
            <div className={styles.jobSummary}>
                <div className={styles.informationHeader}>Job information for {this.props.params.jid}:</div>
                {this.renderJobData(this.props.job)}
                <div className={styles.resultsHeader}>Results of {this.props.params.jid}:</div>
                {this.renderJobResult(this.props.result)}
            </div>
        );
    },

    render() {
        if (this.props.fetchInProgress) {
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

function select(state, ownProps) {
    var jid = ownProps.params.jid;
    return {
        job: state.Jobs.jobs[jid],
        result: state.Jobs.jobResults[jid],
        fetchInProgress: !!state.Jobs.jobsBeingFetched[jid]
    };
}

export default connect(select, { loadJobResult })(DetailedJobTab);
