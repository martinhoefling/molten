var React = require('react');
var _ = require('lodash');
var connect = require('react-redux').connect;

var LoadingIndicator = require('elements/LoadingIndicator');
var StructuredElement = require('elements/StructuredElement');

var actionCreators = require('ActionCreators');

var tabStyle = require('./Tab.less');
var styles = require('./DetailedJobTab.less');

var DetailedJobTab = React.createClass({

    propTypes: {
        params: React.PropTypes.object,
        job: React.PropTypes.object.isRequired,
        result: React.PropTypes.object,
        fetchInProgress: React.PropTypes.bool.isRequired,
        loadJobResult: React.PropTypes.func.isRequired
    },

    componentWillMount() {
        if (_.isEmpty(this.props.result)) {
            this.props.loadJobResult(this.props.params.jid);
        }
    },

    renderJob() {
        return (
            <div className={styles.jobSummary}>
                <div className={styles.informationHeader}>Job information for {this.props.job.jid}:</div>
                <StructuredElement downloadEnabled element={this.props.job}/>
                <div className={styles.resultsHeader}>Results of {this.props.job.jid}:</div>
                <StructuredElement downloadEnabled element={this.props.result}/>
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
        job: state.Job.jobs[jid],
        result: state.Job.jobResults[jid],
        fetchInProgress: state.Job.jobsBeingFetched[jid]
    };
}

module.exports = connect(select, { loadJobResult: actionCreators.loadJobResult })(DetailedJobTab);
