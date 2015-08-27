var React = require('react');
var Paper = require('material-ui/lib/paper');
var classnames = require('classnames');
var moment = require('moment');
var StructuredElement = require('elements/structuredElement');

var rowStyles = require('components/RowLayout.less');
var styles = require('./Event.less');

var Event = React.createClass({
    propTypes: {
        event: React.PropTypes.object.isRequired
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
        var interval = setInterval(this.updateTimestamp, 10000);
        this.setState({ interval });
    },

    updateTimestamp() {
        this.setState({ time: this.getTimeStr() });
    },

    componentWillUnmount() {
        clearInterval(this.state.interval);
    },

    renderHeader() {
        return (
            <div className={classnames(styles.header)}>
                <span>{this.props.event.tag}</span>
                <span>{this.state.time}</span>
            </div>
        );
    },

    renderBody() {
        return (
            <div>
                <StructuredElement element={this.props.event.data}/>
            </div>
            );
    },

    render() {
        return (
            <Paper className={classnames(rowStyles.this, styles.this)} zDepth={2}>
                {this.renderHeader()}
                {this.renderBody()}
            </Paper>
        );
    }
});

module.exports = Event;
