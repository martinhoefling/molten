import React from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';

import Paper from 'material-ui/lib/paper';

import CollapsedStructuredElement from 'elements/CollapsedStructuredElement';
import Constants from 'Constants';

import rowStyles from 'components/RowLayout.less';
import styles from './JobSummary.less';

const JobSummary = React.createClass({
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
                <div>
                    <span className={styles.joblabel}>Job ID:</span>
                    <Link to={`${Constants.URL.JOB}/${this.props.job.jid}`}>{this.props.job.jid}</Link>
                </div>
            </div>
        );
    },

    renderBody() {
        return (
            <div>
                <CollapsedStructuredElement
                    downloadEnabled
                    collapseOnly={['return']}
                    element={this.props.job}/>
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

export default JobSummary;
