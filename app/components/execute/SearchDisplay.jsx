import React from 'react';
import _ from 'lodash';
import classnames from 'classnames';

import rowStyles from 'components/RowLayout.less';
import styles from './SearchDisplay.less';

const SearchDisplay = React.createClass({
    propTypes: {
        search: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.object]).isRequired,
        onFunctionSelect: React.PropTypes.func
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
