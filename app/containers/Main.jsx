var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var ThemeManager = require('material-ui/lib/styles/theme-manager')();

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var Login = require('components/Login');
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

    mixins: [FluxMixin, StoreWatchMixin('SessionStore')],

    getStateFromFlux: function () {
        var flux = this.getFlux();
        return {
            currentSession: flux.store('SessionStore').getSession(),
            sessionErrorMessage: flux.store('SessionStore').getErrorMessage()
        };
    },

    renderLogin() {
        if (this.state.currentSession) {
            return null;
        }
        return <Login flux={this.props.flux} errorMessage={this.state.sessionErrorMessage}/>;
    },

    renderTabs() {
        if (!this.state.currentSession) {
            return null;
        }
        return <TabHeaders flux={this.props.flux} session={this.state.currentSession}/>;
    },

    renderRouteHandler() {
        if (!this.state.currentSession) {
            return null;
        }
        return <RouteHandler flux={this.props.flux}/>;
    },

    render() {
        return (
            <div className={styles.this}>
                {this.renderLogin()}
                {this.renderTabs()}
                {this.renderRouteHandler()}
            </div>
        );
    }
});

module.exports = Main;
