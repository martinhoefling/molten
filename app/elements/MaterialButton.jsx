var React = require('react');
var IconButton = require('material-ui/lib/icon-button');

var MaterialButton = React.createClass({

    propTypes: {
        iconClass: React.PropTypes.string.isRequired,
        onClick: React.PropTypes.func.isRequired,
        iconStyle: React.PropTypes.object
    },

    render() {
        return (
            <IconButton
                iconStyle={this.props.iconStyle}
                onClick={this.props.onClick}>
                <span className='material-icons'>{this.props.iconClass}</span>
            </IconButton>
        );
    }
});

module.exports = MaterialButton;
