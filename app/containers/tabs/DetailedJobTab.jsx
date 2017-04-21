import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';

import LoadingIndicator from 'elements/LoadingIndicator';
import StructuredElement from 'elements/StructuredElement';
import { loadJobResult } from 'ActionCreators';

import tabStyle from './Tab.less';
import styles from './DetailedJobTab.less';

const DetailedJobTab = createReactClass({
    displayName: 'DetailedJobTab',

    propTypes: {
        params: PropTypes.object,
        job: PropTypes.object,
        result: PropTypes.object,
        fetchInProgress: PropTypes.bool.isRequired,
        loadJobResult: PropTypes.func.isRequired
    },

    componentWillMount() {
        if (_.isEmpty(this.props.result)) {
            this.props.loadJobResult(this.props.match.params.jid);
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
                <div className={styles.informationHeader}>Job information for {this.props.match.params.jid}:</div>
                {this.renderJobData(this.props.job)}
                <div className={styles.resultsHeader}>Results of {this.props.match.params.jid}:</div>
                {this.renderJobResult(this.props.result)}
            </div>
        );
    },

    render() {
        if (this.props.fetchInProgress) {
            return (
                <LoadingIndicator>
                    Loading Job {this.props.match.params.jid}
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
    const jid = ownProps.match.params.jid;
    return {
        job: state.Jobs.jobs[jid],
        result: state.Jobs.jobResults[jid],
        fetchInProgress: !!state.Jobs.jobsBeingFetched[jid]
    };
}

export default connect(select, { loadJobResult })(DetailedJobTab);
