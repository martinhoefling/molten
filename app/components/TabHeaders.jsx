var React = require('react');
var connect = require('react-redux').connect;
var actionCreators = require('ActionCreators');
var pushState = require('redux-router').pushState;
var Tab = require('material-ui/lib/tabs/tab');
var Tabs = require('material-ui/lib/tabs/tabs');
var Constants = require('Constants');
var MaterialButton = require('../elements/MaterialButton');

var styles = require('./TabHeaders.less');

var TABS = ['Execute', 'Job', 'Minion', 'Event', 'Settings'];

var TabHeaders = React.createClass({
    propTypes: {
        currentSession: React.PropTypes.object,
        testSessionStatus: React.PropTypes.func.isRequired,
        logout: React.PropTypes.func.isRequired,
        pushState: React.PropTypes.func.isRequired,
        location: React.PropTypes.object.isRequired
    },

    getInitialState() {
        return {
            activeTab: 'execution'
        };
    },

    componentWillMount() {
        if (!this.props.currentSession) {
            this.props.testSessionStatus();
        }
    },

    logout() {
        this.props.logout();
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

        var path = this.props.location.pathname.substring(CONFIG.APP_BASE_URL.length + 1),
            index = Math.max(0, _.findIndex(TABS, tab => path.indexOf(tab.toLowerCase()) === 0));

        return (
            <Tabs initialSelectedIndex={index}>
                {tabs}
            </Tabs>
        );
    },

    _onActive(tab) {
        if (this.props.currentSession) {
            this.props.pushState(null, Constants.URL.ROOT + tab.props.route);
        } else {
            this.props.pushState(null, Constants.URL.LOGIN);
        }
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
                             src={CONFIG.ASSET_BASE_URL + '/github.svg'}/>
                    </a>
                </div>
            </div>
        );
    }
});

function select(state) {
    return {
        currentSession: state.Session.session,
        location: state.router.location
    };
}

module.exports = connect(select, {
    testSessionStatus: actionCreators.testSessionStatus,
    logout: actionCreators.logout,
    pushState
})(TabHeaders);
