var React = require('react');
var classnames = require('classnames');

var styles = require('./StructuredElement.less');

var StructuredElement = React.createClass({
    propTypes: {
        element: React.PropTypes.any.isRequired,
        subComponent: React.PropTypes.func,
        arraysInitiallyCollapsed: React.PropTypes.array,
        initiallyCollapsedItems: React.PropTypes.bool
    },

    getDefaultProps() {
        return {
            subComponent: StructuredElement,
            arraysInitiallyCollapsed: false,
            initiallyCollapsedItems: []
        };
    },

    getInitialState() {
        var collapsed = {};
        this.props.initiallyCollapsedItems.forEach(item => collapsed[item] = true);
        return {
            collapsedItems: collapsed,
            arrayCollapsed: this.props.arraysInitiallyCollapsed
        };
    },

    toggleObjectCollapse(item) {
        var collapsedItems = _.clone(this.state.collapsedItems);
        collapsedItems[item] = !collapsedItems[item];
        this.setState({ collapsedItems });
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
                        <this.props.subComponent element={item}/>
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
                {(this.state.arrayCollapsed && items.length) ? collapsed : items}
            </div>
        );
    },

    renderExpandableValue(key, value) {
        if (!this.state.collapsedItems[key]) {
            return (<this.props.subComponent element={value}/>);
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
