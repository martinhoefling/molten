var React = require('react');
var connect = require('react-redux').connect;
var ActionCreators = require('ActionCreators');

var Events = React.createClass({
    propTypes: {
        error: React.PropTypes.string
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
        source.onmessage = event => dispatch(ActionCreators.serverEventReceived(event));
    },

    render() {
        return (<div>{this.props.error}</div>);
    }

});

module.exports = connect()(Events);
