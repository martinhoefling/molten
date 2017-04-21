import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import LoadingIndicator from 'elements/LoadingIndicator';
import Minion from 'components/minions/Minion';

import tabStyle from './Tab.less';

const MinionsTab = createReactClass({
    displayName: 'MinionsTab',

    propTypes: {
        fetchingMinionsInProgress: PropTypes.bool.isRequired,
        minions: PropTypes.array.isRequired
    },

    renderMinions() {
        return this.props.minions.map(minion => <Minion key={minion.id} minion={minion}/>);
    },

    render() {
        if (this.props.fetchingMinionsInProgress) {
            return (
                <LoadingIndicator>
                    Loading Minions
                </LoadingIndicator>
            );
        }
        return (
            <div className={tabStyle.this}>
                {this.renderMinions()}
            </div>
        );
    }
});

function select(state) {
    var minions = _.keys(state.Minions.minions).map(key => ({
        id: key,
        grains: state.Minions.minions[key]
    }));
    return {
        minions,
        fetchingMinionsInProgress: state.Minions.fetchingMinionsInProgress
    };
}

export default connect(select)(MinionsTab);
