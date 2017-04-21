import React from 'react';
import PropTypes from 'prop-types';

import createReactClass from 'create-react-class';
import _ from 'lodash';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';

import styles from './DateTimePicker.less';

const DateTimePicker = createReactClass({
    displayName: 'DateTimePicker',

    propTypes: {
        labelText: PropTypes.string,
        datetime: PropTypes.instanceOf(Date),
        dateHintText: PropTypes.string,
        timeHintText: PropTypes.string,
        onChange: PropTypes.func
    },

    getDefaultProps() {
        return {
            onChange: _.noop,
            dateHintText: 'date',
            timeHintText: 'time'
        };
    },

    getInitialState() {
        return {
            currentDatetime: this.props.datetime
        };
    },

    onChange(newDate) {
        this.setState({
            currentDatetime: newDate
        });
        this.props.onChange(newDate);
    },

    render() {
        return (
            <div className={styles.this}>
                <span className={styles.label}>{this.props.labelText}</span>
                <DatePicker
                    defaultDate={this.props.datetime}
                    ref='date'
                    hintText={this.props.dateHintText}
                    onChange={(event, date) => this.onChange(date) }
                    value={this.state.currentDatetime}
                    mode='landscape'
                    textFieldStyle={{ width: '90px' }}
                    autoOk={true} />
                <TimePicker
                    defaultTime={this.props.datetime}
                    ref='time'
                    hintText={this.props.timeHintText}
                    onChange={(event, date) => this.onChange(date) }
                    value={this.state.currentDatetime}
                    mode='landscape'
                    style={{ width: '50px' }}
                    format='24hr'/>
            </div>
        );
    }
});

export default DateTimePicker;
