import React from 'react';
import Paper from 'material-ui/lib/paper';
import classnames from 'classnames';
import moment from 'moment';
import CollapsedStructuredElement from 'elements/CollapsedStructuredElement';

import rowStyles from 'components/RowLayout.less';
import styles from './Event.less';

const UPDATE_INTERVAL = 10000;

const Event = React.createClass({
    propTypes: {
        event: React.PropTypes.object.isRequired,
        filtered: React.PropTypes.bool
    },

    getDefaultProps() {
        return {
            filtered: false
        };
    },

    getInitialState() {
        return {
            time: this.getTimeStr(),
            interval: null
        };
    },

    getTimeStr() {
        return moment(this.props.event.timestamp).fromNow();
    },

    componentWillMount() {
        var interval = setInterval(this.updateTimestamp, UPDATE_INTERVAL);
        this.setState({ interval });
    },

    updateTimestamp() {
        this.setState({ time: this.getTimeStr() });
    },

    componentWillUnmount() {
        clearInterval(this.state.interval);
    },

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.filtered !== this.props.filtered) {
            return true;
        }
        if (nextState.time !== this.state.time) {
            return true;
        }
        return false;
    },

    renderHeader() {
        return (
            <div className={classnames(styles.header)}>
                <span>
                    <span className={styles.taglabel}>Tag:</span>
                    <span>{this.props.event.tag}</span>
                </span>
                <span>{this.state.time}</span>
            </div>
        );
    },

    renderBody() {
        return (
            <div>
                <CollapsedStructuredElement
                    downloadEnabled
                    collapseOnly={['return']}
                    element={this.props.event.data}/>
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

export default Event;
