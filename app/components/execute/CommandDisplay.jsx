import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Paper from 'material-ui/Paper';

import StructuredElement from 'elements/StructuredElement';
import rowStyles from 'components/RowLayout.less';
import styles from './CommandDisplay.less';

const CommandDisplay = createReactClass({
    displayName: 'CommandDisplay',

    propTypes: {
        command: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.object,
            PropTypes.string,
            PropTypes.bool
        ]).isRequired,
        downloadEnabled: PropTypes.bool
    },

    render() {
        return (
            <Paper className={classnames(rowStyles.this, styles.this)} zDepth={2}>
                <div className={styles.content}>
                    <StructuredElement data={this.props.command} downloadEnabled={this.props.downloadEnabled} />
                </div>
            </Paper>
        );
    }
});

export default CommandDisplay;
