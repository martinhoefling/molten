var React = require('react');
var classnames = require('classnames');

var styles = require('./StructuredElement.less');

var StructuredElement = React.createClass({
    propTypes: {
        element: React.PropTypes.any.isRequired
    },

    getInitialState() {
        return {
            collapsedItems: [],
            arrayCollapsed: false
        };
    },

    toggleObjectCollapse(item) {
        var newCollapsedItems = this.state.collapsedItems.slice();

        newCollapsedItems[item] = !this.state.collapsedItems[item];
        this.setState({ collapsedItems: newCollapsedItems });
    },

    toggleArrayCollapse() {
        this.setState({ arrayCollapsed: !this.state.arrayCollapsed });
    },

    renderItem(item) {
        if (Array.isArray(item)) {
            return this.renderArray(item);
        }
        if (typeof item === 'object' && item !== null) {
            return this.renderObject(item);
        }
        return this.renderPrimitive(item);
    },

    renderArray(array) {
        var items = array.map(function (item, ndx) {
            return (
                <div className='array-item' key={ndx}>
                    <div className='array-item-marker'
                         onClick={this.toggleArrayCollapse}>
                    </div>
                    <div className='array-item-content'>
                        <StructuredElement element={item}/>
                    </div>
                </div>
            );
        }.bind(this));

        var collapsed = (
            <div className='array-item collapsed'
                 onClick={this.toggleArrayCollapse}>
            </div>
        );

        return (
            <div
                className={classnames('array', { empty: !items.length })}>
                {!this.state.arrayCollapsed ? items : collapsed}
            </div>
        );
    },

    renderExpandableValue(key, value) {
        if (!this.state.collapsedItems[key]) {
            return (<StructuredElement element={value}/>);
        }
        return (
            <div className='object-collapsed'
                 onClick={this.toggleObjectCollapse.bind(this, key)}>
            </div>
        );
    },

    renderObject(object) {
        var objectProps = Object.keys(object).sort().map(function (key) {
            return (
                <div className='object-property' key={key}>
                    <div className='object-key'
                         onClick={this.toggleObjectCollapse.bind(this, key)}>
                        {key}
                    </div>
                    <div className={classnames('object-value', { collapsed: this.state.collapsedItems[key] })}>
                        {this.renderExpandableValue(key, object[key])}
                    </div>
                </div>
            );
        }.bind(this));
        return (
            <div className={classnames('object', { empty: !objectProps.length })}>
                {objectProps}
            </div>
        );
    },

    renderPrimitive(primitive) {
        switch (typeof primitive){
            case 'string':
                return (
                    <div className='primitive-string'>{primitive}</div>
                );
            case 'boolean':
                return (
                    <div className='primitive-boolean'>{primitive ? 'True' : 'False'}</div>
                );
            case 'number':
                return (
                    <div className='primitive-boolean'>{primitive}</div>
                );
            case 'null':
                return (
                    <div className='primitive-null'>None</div>
                );
            default:
                return (
                    <div>Unknown primitive {typeof primitive}</div>
                );
        }
    },

    render() {
        return (
            <div className={styles.this}>
                {this.renderItem(this.props.element)}
            </div>
        );
    }
});

module.exports = StructuredElement;
