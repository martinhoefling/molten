var React = require('react');
var _ = require('lodash');
var TextField = require('material-ui/lib/text-field');

var ValidatedTextField = React.createClass({

    propTypes: {
        validationRegexp: React.PropTypes.instanceOf(RegExp).isRequired,
        validationErrorMsg: React.PropTypes.string.isRequired,
        onChange: React.PropTypes.func
    },

    getDefaultProps() {
        return {
            onChange: _.noop
        };
    },

    setValue(value) {
        this.validate(value);
        return this.refs.textfield.setValue(value);
    },

    setErrorText(value) {
        return this.refs.textfield.setErrorText(value);
    },

    onChange(event) {
        return this.validate(event.target.value);
    },

    validate(value) {
        var valid = value.search(this.props.validationRegexp) > -1;
        if (value) {
            this.refs.textfield.setErrorText(valid ? '' : this.props.validationErrorMsg);
        } else {
            this.refs.textfield.setErrorText('');
        }
        return valid;
    },

    render() {
        var props = _.omit(this.props, ['validationRegexp', 'validationErrorMsg', 'onChange']);
        return (
            <TextField
                ref='textfield'
                onChange={(event) => this.props.onChange(event, this.onChange(event))}
                {...props}
                />
        );
    }
});

module.exports = ValidatedTextField;
