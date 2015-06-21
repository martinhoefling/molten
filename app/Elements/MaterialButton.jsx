var React = require('react');
var IconButton = require('material-ui/lib/icon-button');

var MaterialButton = React.createClass({

    propTypes: {
        iconClass: React.PropTypes.string.isRequired,
        onClick: React.PropTypes.func.isRequired
    },

    render() {
        return (
            <IconButton
                onClick={this.props.onClick}>
                <span className='material-icons'>{this.props.iconClass}</span>
            </IconButton>
        );
    }
});

module.exports = MaterialButton;
