import React from 'react';
import _ from 'lodash';
import TextField from 'material-ui/lib/text-field';

const ValidatedTextField = React.createClass({
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

    getInitialState() {
        return { errorText: '' };
    },

    setValue(value) {
        this.validate(value);
        return this.refs.textfield.setValue(value);
    },

    setErrorText(value) {
        return this.setState({ errorText: value });
    },

    onChange(event) {
        return this.validate(event.target.value);
    },

    focus() {
        return this.refs.textfield.focus();
    },

    validate(value) {
        var valid = value.search(this.props.validationRegexp) > -1;
        if (value) {
            this.setErrorText(valid ? '' : this.props.validationErrorMsg);
        } else {
            this.setErrorText('');
        }
        return valid;
    },

    render() {
        var props = _.omit(this.props, ['validationRegexp', 'validationErrorMsg', 'onChange']);
        return (
            <TextField
                ref='textfield'
                errorText={this.state.errorText}
                onChange={(event) => this.props.onChange(event, this.onChange(event))}
                {...props}
                />
        );
    }
});

export default ValidatedTextField;
