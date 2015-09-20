var React = require('react');

var StructuredElement = require('elements/StructuredElement');

var CollapsedStructuredElement = React.createClass({
    propTypes: {
        element: React.PropTypes.any.isRequired,
        downloadEnabled: React.PropTypes.bool,
        collapseOnly: React.PropTypes.array,
        arraysCollapsed: React.PropTypes.bool
    },

    getDefaultProps() {
        return {
            collapseOnly: [],
            arraysCollapsed: false
        };
    },

    render() {
        var collapsedItems = [];
        if (typeof this.props.element === 'object' && this.props.element !== null) {
            collapsedItems = Object.keys(this.props.element).filter(
                    key => (typeof this.props.element[key] === 'object' && this.props.element[key] !== null &&
                        !Array.isArray(this.props.element[key]))
            );
        }

        if (this.props.collapseOnly.length) {
            collapsedItems = _.intersection(collapsedItems, this.props.collapseOnly);
        }

        return (
            <StructuredElement
                subComponent={CollapsedStructuredElement}
                initiallyCollapsedItems={collapsedItems}
                arraysInitiallyCollapsed={this.props.arraysCollapsed}
                {...this.props}
            />
        );
    }
});

module.exports = CollapsedStructuredElement;
