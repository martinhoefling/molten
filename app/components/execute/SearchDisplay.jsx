import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classnames from 'classnames';

import rowStyles from 'components/RowLayout.less';
import styles from './SearchDisplay.less';

const SearchDisplay = createReactClass({
    displayName: 'SearchDisplay',

    propTypes: {
        search: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
        onFunctionSelect: PropTypes.func
    },

    getDefaultProps() {
        return {
            onFunctionSelect: _.noop
        };
    },

    renderList() {
        var rows = _.keys(this.props.search).sort().map(function (fun) {
            return (
                <tr className={styles.function}
                    onClick={() => this.props.onFunctionSelect(fun)}
                    key={fun}>
                    <td>{fun}</td>
                    <td>{this.props.search[fun]}</td>
                </tr>
            );
        }.bind(this));

        return (
            <div>
                <table>
                    <tbody>
                    {rows}
                    </tbody>
                </table>
            </div>
        );
    },

    render() {
        return (
            <div className={classnames(rowStyles.this, styles.this)}>
                <div className={styles.content}>
                    { typeof this.props.search === 'string' ? this.props.search : this.renderList() }
                </div>
            </div>
        );
    }
});

export default SearchDisplay;
