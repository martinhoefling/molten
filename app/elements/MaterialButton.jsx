import React from 'react';
import IconButton from 'material-ui/lib/icon-button';

const MaterialButton = React.createClass({

    propTypes: {
        iconClass: React.PropTypes.string.isRequired,
        onClick: React.PropTypes.func.isRequired,
        iconStyle: React.PropTypes.object,
        title: React.PropTypes.string
    },

    render() {
        return (
            <IconButton
                iconStyle={this.props.iconStyle}
                title={this.props.title}
                onClick={this.props.onClick}>
                <span className='material-icons'>{this.props.iconClass}</span>
            </IconButton>
        );
    }
});

export default MaterialButton;
