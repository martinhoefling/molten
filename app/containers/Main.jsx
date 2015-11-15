var React = require('react');
var styles = require('./Main.less');
var EventListener = require('containers/EventListener');
var TabHeaders = require('components/TabHeaders');

var Main = React.createClass({
    render() {
        return (
            <div className={styles.this}>
                <TabHeaders/>
                {this.props.children}
                <EventListener/>
            </div>
        );
    }
});

module.exports = Main;
