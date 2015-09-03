var React = require('react');
var Paper = require('material-ui/lib/paper');
var classnames = require('classnames');
var StructuredElement = require('elements/StructuredElement');

var rowStyles = require('components/RowLayout.less');
var styles = require('./CommandDisplay.less');

var CommandDisplay = React.createClass({
    propTypes: {
        command: React.PropTypes.oneOfType(React.PropTypes.array, React.PropTypes.object).isRequired
    },

    render() {
        return (
            <Paper className={classnames(rowStyles.this, styles.this)} zDepth={2}>
                <div className={styles.content}>
                    <StructuredElement element={this.props.command} />
                </div>
            </Paper>
        );
    }
});

module.exports = CommandDisplay;
