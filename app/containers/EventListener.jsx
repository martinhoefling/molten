import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import config from 'config';
import { serverEventReceived } from 'ActionCreators';

const Events = createReactClass({
    displayName: 'Events',

    propTypes: {
        error: PropTypes.string,
        serverEventReceived: PropTypes.func.isRequired
    },

    componentDidMount() {
        const sourceURL = config.API_BASE_URL + '/events';
        const source = new EventSource(sourceURL);
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
