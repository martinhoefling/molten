import React from 'react';
import CircularProgress from 'material-ui/lib/circular-progress';

import style from './LoadingIndicator.less';

const LoadingIndicator = React.createClass({
    propTypes: {
        children: React.PropTypes.node

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
