import React from "react";
import {Link} from "react-router";
import RaisedButton from "material-ui/lib/raised-button";
import JSONTree from "react-json-tree";
import classnames from "classnames";
import Constants from "Constants";
import styles from "./StructuredElement.less";

const JID_REGEX = /^"(\d{20})"$/;

const theme = {
    scheme: 'molten',
    author: 'based on solarized from ethan schoonover (http://ethanschoonover.com/solarized)',
    base00: '#002b36',
    base01: '#073642',
    base02: '#586e75',
    base03: '#657b83',
    base04: '#839496',
    base05: '#93a1a1',
    base06: '#eee8d5',
    base07: '#ffffff',
    base08: '#dc322f',
    base09: '#cb4b16',
    base0A: '#b58900',
    base0B: '#859900',
    base0C: '#2aa198',
    base0D: '#268bd2',
    base0E: '#6c71c4',
    base0F: '#d33682'
};

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
                theme={{
                    extend: theme
                }}
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
