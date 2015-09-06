var React = require('react');
var Paper = require('material-ui/lib/paper');
var classnames = require('classnames');
var moment = require('moment');
var CollapsedStructuredElement = require('elements/CollapsedStructuredElement');

var rowStyles = require('components/RowLayout.less');
var styles = require('./JobSummary.less');

var JobSummary = React.createClass({
    propTypes: {
        job: React.PropTypes.object.isRequired,
        filtered: React.PropTypes.bool
    },

    getDefaultProps() {
        return {
            filtered: false
        };
    },

    renderHeader() {
        return (
            <div className={classnames(styles.header)}>
                {this.props.job.id}
            </div>
        );
    },

    renderBody() {
        return (
            <div>
                <CollapsedStructuredElement
                    collapseOnly={['return']}
                    element={_.omit(this.props.job, ['id'])}/>
            </div>
            );
    },

    render() {
        return (
            <Paper className={classnames(rowStyles.this, styles.this, { filtered: this.props.filtered })} zDepth={2}>
                {this.renderHeader()}
                {this.renderBody()}
            </Paper>
        );
    }
});

module.exports = JobSummary;
