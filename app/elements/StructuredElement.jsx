import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import JSONTree from 'react-json-tree';
import classnames from 'classnames';
import YAML from 'json2yaml';
import { connect } from 'react-redux';

import { push } from 'connected-react-router';

import Constants from 'Constants';
import styles from './StructuredElement.less';

const JID_REGEX = /^"(\d{20})"$/;

const theme = {
    scheme: 'molten',
    author: 'based on solarized from ethan schoonover (http://ethanschoonover.com/solarized)',
    base00: '#000000',
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

const StructuredElement = createReactClass({
    displayName: 'StructuredElement',

    propTypes: {
        data: PropTypes.any.isRequired,
        downloadEnabled: PropTypes.bool,
        arrayCollapseLimit: PropTypes.number,
        collapsedKeys: PropTypes.array,
        settings: PropTypes.object,
        push: PropTypes.func.isRequired
    },

    getDefaultProps() {
        return {
            downloadEnabled: false,
            arrayCollapseLimit: -1,
            collapsedKeys: [],
            settings: {
                asYaml: false,
                displayData: false
            }
        };
    },

    labelRenderer(label) {
        return <span className={classnames(styles.label)}>{label}</span>;
    },

    valueRenderer(value) {
        if (value.match && value.match(JID_REGEX)) {
            const matchGroup = value.match(JID_REGEX)[1];
            return <Link to={`${Constants.URL.JOB}/${matchGroup}`}>{matchGroup}</Link>;
        }
        return value;
    },

    nodeExpanded(key, data, level) {
        if (Array.isArray(data) && data.length >= this.props.arrayCollapseLimit) {
            console.log(key, data, level);
            return false;
        }

        if (this.props.collapsedKeys.find(item => key === item) > -1) {
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
            var theAction = this.props.settings.displayData ? 'open' : 'download';
            var theType = this.props.settings.asYaml ? 'yaml' : 'json';

            return (
                <div className={styles.downloadPlacement}>
                    <div className={styles.download}>
                        <RaisedButton
                            title={theAction + ' as ' + theType}
                            secondary={true}
                            label={theType}
                            onClick={this.downloadElement}
                        />
                    </div>
                </div>
            );
        }
        return null;
    },

    downloadElement() {
        var jsonData;
        if (this.props.settings.displayData) {
            jsonData = 'data:text/' + (this.props.settings.asYaml ? 'yaml' : 'json') + ';charset=utf-8,';
        } else {
            jsonData = 'data:application/octet-stream;charset=utf-8,';
        }
        if (this.props.settings.asYaml) {
            jsonData += encodeURIComponent(YAML.stringify(this.props.data));
        } else {
            jsonData += encodeURIComponent(JSON.stringify(this.props.data, null, 2));
        }
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

function select(state) {
    return {
        settings: state.Settings
    };
}

export default connect(select, { push })(StructuredElement);
