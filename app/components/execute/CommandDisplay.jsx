var React = require('react');
var Paper = require('material-ui/lib/paper');
var classnames = require('classnames');
var StructuredElement = require('elements/StructuredElement');

var rowStyles = require('components/RowLayout.less');
var styles = require('./CommandDisplay.less');

var CommandDisplay = React.createClass({
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

module.exports = CommandDisplay;
