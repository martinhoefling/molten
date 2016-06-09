import React from 'react';
import { Link } from 'react-router';

import RaisedButton from 'material-ui/lib/raised-button';
import JSONTree from 'react-json-tree';
import classnames from 'classnames';

import Constants from 'Constants';

import styles from './StructuredElement.less';

const JID_REGEX = /^"(\d{20})"$/;

const StructuredElement = React.createClass({
    propTypes: {
        data: React.PropTypes.any.isRequired,
        downloadEnabled: React.PropTypes.bool,
        arrayCollapseLimit: React.PropTypes.number,
        collapsedKeys: React.PropTypes.array
    },

    labelRenderer(label) {
        return <span className={classnames(styles.label)}>{label}</span>;
    },

    valueRenderer(value) {
        if (value.match && value.match(JID_REGEX)) {
            var matchGroup = value.match(JID_REGEX)[1];
            return <Link to={`${Constants.URL.JOB}/${matchGroup}`}>{matchGroup}</Link>;
        }
        return value;
    },

    nodeExpanded(key, data, level) {
        if (!(this.props.arrayCollapseLimit === undefined) &&
            Array.isArray(data) && data.length >= this.props.arrayCollapseLimit) {
            console.log(key, data, level);
            return false;
        }

        if (this.props.collapsedKeys && this.props.collapsedKeys.find(item => key === item) > -1) {
            return false;
        }

        return true;
    },

    renderItem(data) {
        return (
            <JSONTree
                data={data}
                hideRoot={true}
                nodeExpanded={ this.nodeExpanded }
                valueRenderer={ this.valueRenderer }
                labelRenderer={ this.labelRenderer }
            />
        );
    },

    renderDownload() {
        if (this.props.downloadEnabled) {
            return (
                <div className={styles.downloadPlacement}>
                    <div className={styles.download}>
                        <RaisedButton
                            title='download as json'
                            secondary={true}
                            label='json'
                            onClick={this.downloadElement}
                        />
                    </div>
                </div>
            );
        }
        return null;
    },

    downloadElement() {
        var jsonData = 'data:application/octet-stream;charset=utf-8,' +
            encodeURIComponent(JSON.stringify(this.props.data, null, 2));
        window.open(jsonData);
    },

    render() {
        return (
            <div className={styles.this}>
                {this.renderDownload()}
                {this.renderItem(this.props.data)}
            </div>
        );
    }
});

export default StructuredElement;
