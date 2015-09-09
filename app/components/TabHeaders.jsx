var React = require('react');

var Tab = require('material-ui/lib/tabs/tab');
var Tabs = require('material-ui/lib/tabs/tabs');
var MaterialButton = require('../elements/MaterialButton');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);

var styles = require('./TabHeaders.less');

var TABS = ['Execute', 'Jobs', 'Minions', 'Events', 'Settings'];

var TabComponent = React.createClass({
    contextTypes: {
        router: React.PropTypes.func
    },

    propTypes: {
        session: React.PropTypes.object.isRequired
    },

    mixins: [FluxMixin],

    getDefaultProps() {
        return {
            initialTabIndex: 0
        };
    },

    getInitialState() {
        return {
            activeTab: 'execution'
        };
    },

    toggleMenu() {
        this.setState({ menuOpen: !this.state.menuOpen });
    },

    logout() {
        this.getFlux().actions.logout();
    },

    renderTabs() {
        var tabs = TABS.map(function (name) {
            return (
                <Tab
                    label={name}
                    key={name}
                    route={name.toLowerCase()}
                    onActive={this._onActive} />
            );
        }, this);

        var initialTabName = this.context.router.getCurrentRoutes()[1].name,
            tabNames = TABS.map(name => name.toLowerCase()),
            initialTabIndex = tabNames.indexOf(initialTabName);

        return (
            <Tabs initialSelectedIndex={initialTabIndex}>
                {tabs}
            </Tabs>
        );
    },

    _onActive(tab) {
        this.getFlux().actions.transition(tab.props.route);
    },

    render() {
        return (
            <div>
                {this.renderTabs()}
                <div className={styles.logout}>
                <MaterialButton
                    iconClass='cancel'
                    onClick={this.logout}/>
                </div>
            </div>
        );
    }
});

module.exports = TabComponent;
