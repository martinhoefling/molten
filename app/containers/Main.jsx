var React = require('react');
var styles = require('./Main.less');
var EventListener = require('containers/EventListener');

var Main = React.createClass({
    render() {
        return (
            <div className={styles.this}>
                {this.props.children['top']}
                {this.props.children['main']}
                <EventListener/>
            </div>
        );
    }
});

module.exports = Main;
