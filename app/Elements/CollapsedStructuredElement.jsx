var React = require('react');

var StructuredElement = require('elements/StructuredElement');

var CollapsedStructuredElement = React.createClass({
    propTypes: {
        element: React.PropTypes.any.isRequired
    },
    render() {
        var collapsedItems = [];
        if (typeof this.props.element === 'object' && this.props.element !== null) {
            collapsedItems = Object.keys(this.props.element).filter(
                    key => (typeof this.props.element[key] === 'object' && this.props.element[key] !== null &&
                        !Array.isArray(this.props.element[key]))
            );
        }
        return (
            <StructuredElement
                subComponent={CollapsedStructuredElement}
                arraysInitiallyCollapsed={true}
                initiallyCollapsedItems={collapsedItems}
                {...this.props}
            />
        );
    }
});

module.exports = CollapsedStructuredElement;
