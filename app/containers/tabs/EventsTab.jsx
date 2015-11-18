import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';
import Toggle from 'material-ui/lib/toggle';

import Event from 'components/events/Event';
import { clearEvents } from 'ActionCreators';

import tabStyle from './Tab.less';
import style from './EventsTab.less';

const EventsTab = React.createClass({
    propTypes: {
        events: React.PropTypes.array.isRequired,
        clearEvents: React.PropTypes.func.isRequired
    },

    getInitialState() {
        return {
            events: this.props.events,
            tagRegexStr: '',
            paused: false
        };
    },

    componentWillUpdate(nextProps, nextState) {
        if (this.state.paused && !nextState.paused) {
            this.setState({ events: nextProps.events.slice() });
        } else {
            if (this.props.events !== nextProps.events) {
                this.setState({ events: nextProps.events.slice() });
            }
        }
    },

    renderHeader(events) {
        return (
            <div className={style.header}>
                <RaisedButton
                    disabled={!this.state.events.length}
                    label='Clear Events'
                    primary={true}
                    onClick={this.props.clearEvents}
                    />
                <Toggle
                    name='togglePause'
                    style={{ width: '120px' }}
                    value='togglePause'
                    onToggle={() => this.setState({ paused: !this.state.paused })}
                    label='pause'/>
                <TextField
                    hintText='Tag filter regex'
                    floatingLabelText='Tag Filter'
                    onChange={event => this.setState({ tagRegexStr: event.target.value })}
                    />
                <span>{events.length}</span>
            </div>
        );
    },

    renderEvents(events) {
        var eventComponents = this.state.events.map(function (event, ndx) {
            return (
                <Event key={ndx}
                       filtered={!_.contains(events, event)}
                       event={event}/>
            );
        });
        return (<div>{eventComponents}</div>);
    },

    render() {
        var events = this.state.events;
        if (this.state.tagRegexStr.length) {
            var re = new RegExp(this.state.tagRegexStr);
            events = this.state.events.filter(event => re.test(event.tag));
        }
        return (
            <div className={tabStyle.this}>
                {this.renderHeader(events)}
                {this.renderEvents(events)}
            </div>
        );
    }
});

function select(state) {
    return {
        events: state.Events.events
    };
}

export default connect(select, { clearEvents })(EventsTab);
