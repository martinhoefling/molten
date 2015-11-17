var React = require('react');
var _ = require('lodash');
var classnames = require('classnames');

var ValidatedTextField = require('elements/ValidatedTextField');
var SelectField = require('material-ui/lib/select-field');
var Paper = require('material-ui/lib/paper');

var rowStyles = require('components/RowLayout.less');
var styles = require('./TargetConfiguration.less');

const EXPRESSION_FORM = [
    { name: 'glob', description: 'Bash glob completion' },
    { name: 'pcre', description: 'Perl style regular expression' },
    { name: 'list', description: 'Python list of hosts' },
    { name: 'grain', description: 'Match based on a grain comparison' },
    { name: 'grain_pcre', description: 'Grain comparison with a regex' },
    { name: 'pillar', description: 'Pillar data comparison' },
    { name: 'pillar_pcre', description: 'Pillar data comparison with a regex' },
    { name: 'nodegroup', description: 'Match on nodegroup' },
    { name: 'range', description: 'Use a Range server for matching' },
    { name: 'compound', description: 'Pass a compound match string' }
];

var RunnerConfiguration = React.createClass({
    propTypes: {
        config: React.PropTypes.object.isRequired,
        onConfigChange: React.PropTypes.func.isRequired,
        disabled: React.PropTypes.bool.isRequired
    },

    getCurrentExprForm() {
        if (this.props.config.expr_form) {
            return _.find(EXPRESSION_FORM, form => form.name === this.props.config.expr_form);
        }
        return EXPRESSION_FORM[0];
    },

    onExprFormChange(event) {
        this.props.onConfigChange(this.getConfig(event.target.value));
    },

    getConfig(exprFormItem, options) {
        options = options || {};
        var returnObj = this.props.config;
        if (this.props.disabled) {
            return returnObj;
        }
        returnObj['expr_form'] = exprFormItem.name;
        return _.omit(_.assign(returnObj, options), value => value === '');
    },

    onValueChanged(configProperty, event, valid) {
        var value = event.target.value;
        var config = this.getConfig(this.getCurrentExprForm());
        if (valid || value === '') {
            config = this.getConfig(this.getCurrentExprForm(), { [configProperty]: value });
        }
        this.props.onConfigChange(config);
    },

    render() {
        var menuItems = EXPRESSION_FORM.map(item => ({ text: item.name, payload: item }));

        return (
            <Paper className={classnames(rowStyles.this, styles.this)} Depth={2}>
                <SelectField
                    floatingLabelText='Matcher'
                    style={{ width: '130px' }}
                    value={this.getCurrentExprForm()}
                    disabled={this.props.disabled}
                    menuItems={menuItems}
                    selectedIndex={EXPRESSION_FORM.indexOf(this.getCurrentExprForm())}
                    onChange={this.onExprFormChange}
                    />
                <ValidatedTextField
                    disabled={this.props.disabled}
                    hintText={this.getCurrentExprForm().description}
                    floatingLabelText='Target Expression'
                    defaultValue={this.props.config.tgt}
                    onChange={this.onValueChanged.bind(this, 'tgt')}
                    validationRegexp={/.+/}
                    validationErrorMsg='invalid target specification'
                    />
                <ValidatedTextField
                    disabled={this.props.disabled}
                    hintText='comma separated list of returners'
                    floatingLabelText='Returner(s)'
                    onChange={this.onValueChanged.bind(this, 'ret')}
                    defaultValue={this.props.config.ret}
                    validationRegexp={/^\w+(,\w+)*$/}
                    validationErrorMsg='must be comma separated list'
                    />
            </Paper>
        );
    }
});

module.exports = RunnerConfiguration;
