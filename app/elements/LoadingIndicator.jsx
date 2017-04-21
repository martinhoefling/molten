import React from 'react';
import PropTypes from 'prop-types';

import createReactClass from 'create-react-class';
import CircularProgress from 'material-ui/CircularProgress';

import style from './LoadingIndicator.less';

const LoadingIndicator = createReactClass({
    displayName: 'LoadingIndicator',

    propTypes: {
        children: PropTypes.node

    },

    render() {
        return (
            <div className={style.this}>
                <CircularProgress mode='indeterminate'/>
                {this.props.children}
            </div>
        );
    }
});

export default LoadingIndicator;
