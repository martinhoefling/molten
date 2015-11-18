import React from 'react';
import classnames from 'classnames';
import Paper from 'material-ui/lib/paper';

import StructuredElement from 'elements/StructuredElement';
import rowStyles from 'components/RowLayout.less';
import styles from './CommandDisplay.less';

const CommandDisplay = React.createClass({
    propTypes: {
        command: React.PropTypes.oneOfType([
            React.PropTypes.array,
            React.PropTypes.object,
            React.PropTypes.string,
            React.PropTypes.bool
        ]).isRequired,
        downloadEnabled: React.PropTypes.bool
    },

    render() {
        return (
            <Paper className={classnames(rowStyles.this, styles.this)} Depth={2}>
                <div className={styles.content}>
                    <StructuredElement element={this.props.command} downloadEnabled={this.props.downloadEnabled} />
                </div>
            </Paper>
        );
    }
});

export default CommandDisplay;
