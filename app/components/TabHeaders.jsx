var React = require('react');
var connect = require('react-redux').connect;
var actionCreators = require('ActionCreators');

var Tab = require('material-ui/lib/tabs/tab');
var Tabs = require('material-ui/lib/tabs/tabs');
var Constants = require('Constants');
var MaterialButton = require('../elements/MaterialButton');

var styles = require('./TabHeaders.less');

var TABS = ['Execute', 'Job', 'Minion', 'Event', 'Settings'];

var TabHeaders = React.createClass({
    propTypes: {
        currentSession: React.PropTypes.object
    },

    getInitialState() {
        return {
            activeTab: 'execution'
        };
    },

    componentWillMount() {
        if (!this.state.currentSession) {
            dispatch(actionCreators.testSessionStatus());
        }
    },

    toggleMenu() {
        this.setState({ menuOpen: !this.state.menuOpen });
    },

    logout() {
        dispatch(actionCreators.logout());
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
        dispatch(actionCreators.transition(Constants.URL.ROOT + tab.props.route));
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
        currentSession: state.Session.session
    };
}

module.exports = connect(select)(TabHeaders);
