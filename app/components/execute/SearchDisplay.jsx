var React = require('react');
var _ = require('lodash');

var classnames = require('classnames');
var Paper = require('material-ui/lib/paper');

var StructuredElement = require('elements/structuredElement');

var rowStyles = require('../ConfigurationRowLayout.css');
var styles = require('./SearchDisplay.css');

var SearchDisplay = React.createClass({
    propTypes: {
        search: React.PropTypes.oneOfType(React.PropTypes.string, React.PropTypes.object).isRequired,
        onFunctionSelect: React.PropTypes.func
    },

    getDefaultProps() {
        return {
            onFunctionSelect: _.noop
        };
    },

    renderList() {
        var rows = _.keys(this.props.search).sort().map(function (fun) {
            return (
                <tr key={fun}>
                    <td onClick={() => this.props.onFunctionSelect(fun)}>{fun}</td>
                    <td>{this.props.search[fun]}</td>
                </tr>
            );
        }.bind(this));

        return (
            <div>
                <table>
                    <tbody>
                    {rows}
                    </tbody>
                </table>
            </div>
        );
    },

    render() {
        return (
            <Paper className={classnames(rowStyles.this, styles.this)} zDepth={2}>
                <div className={styles.content}>
                    { typeof this.props.search === 'string' ? this.props.search : this.renderList() }
                </div>
            </Paper>
        );
    }
});

module.exports = SearchDisplay;
