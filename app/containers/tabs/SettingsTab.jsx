var React = require('react');
var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var RaisedButton = require('material-ui/lib/raised-button');
var localStore = require('helpers/localstore');

var tabStyle = require('./Tab.less');

var SettingsTab = React.createClass({
    mixins: [FluxMixin],
    render() {
        return (
            <div className={tabStyle.this}>
                <RaisedButton
                    label='Clear local storage'
                    primary={true}
                    onClick={() => localStore.clear() }
                />
            </div>
        );
    }
});

module.exports = SettingsTab;
