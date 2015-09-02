var React = require('react');
var Paper = require('material-ui/lib/paper');
var classnames = require('classnames');
var StructuredElement = require('elements/structuredElement');

var rowStyles = require('components/RowLayout.less');
var styles = require('./Minion.less');

var Event = React.createClass({
    propTypes: {
        minion: React.PropTypes.object.isRequired
    },

    renderHeader() {
        return (
            <div className={classnames(styles.header)}>
                <span>{this.props.minion.id}</span>
            </div>
        );
    },

    renderBody() {
        return (
            <div>
                <StructuredElement element={this.props.minion.grains}/>
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

module.exports = Event;
