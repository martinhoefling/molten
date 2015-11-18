import React from 'react';
import { connect } from 'react-redux';

import { serverEventReceived } from 'ActionCreators';

const Events = React.createClass({
    propTypes: {
        error: React.PropTypes.string,
        serverEventReceived: React.PropTypes.func.isRequired
    },

    componentDidMount() {
        var sourceURL = CONFIG.API_BASE_URL + '/events';
        var source = new EventSource(sourceURL);
        source.onopen = function() {
            console.debug('server event stream opened: ' + sourceURL);
        };
        source.onerror = function(event) {
            console.debug('server event error!', event);
        };
        source.onmessage = event => this.props.serverEventReceived(event);
    },

    render() {
        return (<div>{this.props.error}</div>);
    }

});

export default connect(null, { serverEventReceived })(Events);
