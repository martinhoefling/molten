var React = require('react');

var Tab = require('material-ui/lib/tabs/tab');
var Tabs = require('material-ui/lib/tabs/tabs');
var MaterialButton = require('../elements/MaterialButton');

var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var styles = require('./TabHeaders.less');

var TABS = ['Execute', 'Job', 'Minion', 'Event', 'Settings'];

var TabHeaders = React.createClass({

    mixins: [FluxMixin, StoreWatchMixin('SessionStore')],

    getInitialState() {
        return {
            activeTab: 'execution'
        };
    },

    getStateFromFlux: function () {
        var flux = this.getFlux();
        return {
            currentSession: flux.store('SessionStore').getSession()
        };
    },

    componentWillMount() {
        if (!this.state.currentSession) {
            this.getFlux().actions.testSessionStatus();
        }
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

        var path = this.props.location.pathname.substring(1),
            index = Math.max(0, _.findIndex(TABS, tab => tab.toLowerCase().indexOf(path) === 0));

        return (
            <Tabs initialSelectedIndex={index}>
                {tabs}
            </Tabs>
        );
    },

    _onActive(tab) {
        this.getFlux().actions.transition('/' + tab.props.route);
    },

    render() {
        return (
            <div className={styles.this}>
                <div className={styles.tabs}>
                    {this.renderTabs()}
                </div>
                <div className={styles.buttons}>
                    <MaterialButton
                        title='logout'
                        iconClass='cancel'
                        onClick={this.logout}/>
                    <a href='https://github.com/martinhoefling/molten'>
                        <img title='open on github'
                             className={styles.github}
                             src='assets/github.svg'/>
                    </a>
                </div>
            </div>
        );
    }
});

module.exports = TabHeaders;
