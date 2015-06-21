var React = require('react');
var Paper = require('material-ui/lib/paper');
var classnames = require('classnames');
var StructuredElement = require('elements/structuredElement');

var rowStyles = require('../ConfigurationRowLayout.css');
var styles = require('./Event.css');

var Event = React.createClass({
    propTypes: {
        event: React.PropTypes.object.isRequired
    },

    render() {
        return (
            <Paper className={classnames(rowStyles.this, styles.this)} zDepth={2}>
                <div className={styles.content}>
                    <StructuredElement element={this.props.event}/>
                </div>
            </Paper>
        );
    }
});

module.exports = Event;
