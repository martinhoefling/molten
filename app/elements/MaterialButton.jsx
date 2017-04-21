import React from 'react';
import PropTypes from 'prop-types';

import createReactClass from 'create-react-class';
import IconButton from 'material-ui/IconButton';

const MaterialButton = createReactClass({
    displayName: 'MaterialButton',

    propTypes: {
        iconClass: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired,
        iconStyle: PropTypes.object,
        title: PropTypes.string
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
