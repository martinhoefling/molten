var React = require('react');
var styles = require('./Main.less');

var Main = React.createClass({
    render() {
        return (
            <div className={styles.this}>
                {this.props.children['top']}
                {this.props.children['main']}
            </div>
        );
    }
});

module.exports = Main;
