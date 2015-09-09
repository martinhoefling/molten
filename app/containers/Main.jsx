var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var ThemeManager = require('material-ui/lib/styles/theme-manager')();

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var Login = require('components/Login');
var LoadingIndicator = require('elements/LoadingIndicator');

var TabHeaders = require('components/TabHeaders');
var styles = require('./Main.less');

var Main = React.createClass({
    propTypes: {
        flux: React.PropTypes.object.isRequired
    },

    childContextTypes: {
        muiTheme: React.PropTypes.object.isRequired
    },

    getChildContext: function () {
        return {
            muiTheme: ThemeManager.getCurrentTheme()
        };
    },

    mixins: [FluxMixin, StoreWatchMixin('SessionStore'), Router.State],

    getStateFromFlux: function () {
        var flux = this.getFlux();
        return {
            currentSession: flux.store('SessionStore').getSession(),
            sessionErrorMessage: flux.store('SessionStore').getErrorMessage()
        };
    },

    renderTabs() {
        if (!this.state.currentSession) {
            return null;
        }
        return <TabHeaders session={this.state.currentSession}/>;
    },

    isLogin() {
        return this.getPath() === '/login';
    },

    renderRouteHandler() {
        if (this.isLogin()) {
            return <RouteHandler errorMessage={this.state.sessionErrorMessage}/>;
        } else if (!this.state.currentSession) {
            return <LoadingIndicator>loading session</LoadingIndicator>;
        }
        return <RouteHandler/>;
    },

    render() {
        return (
            <div className={styles.this}>
                {this.renderTabs()}
                {this.renderRouteHandler()}
            </div>
        );
    }
});

module.exports = Main;
