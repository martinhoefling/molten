import React from 'react';
import _ from 'lodash';
import DatePicker from 'material-ui/lib/date-picker/date-picker';
import TimePicker from 'material-ui/lib/time-picker';

import styles from './DateTimePicker.less';

const DateTimePicker = React.createClass({
    propTypes: {
        labelText: React.PropTypes.string,
        datetime: React.PropTypes.instanceOf(Date),
        dateHintText: React.PropTypes.string,
        timeHintText: React.PropTypes.string,
        onChange: React.PropTypes.func
    },

    getDefaultProps() {
        return {
            onChange: _.noop,
            dateHintText: 'date',
            timeHintText: 'time'
        };
    },

    onChange(newDate) {
        this.props.onChange(newDate);
        this.refs.time.setTime(newDate);
        this.refs.date.setDate(newDate);
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
                    mode='landscape'
                    textFieldStyle={{ width: '90px' }}
                    autoOk={true} />
                <TimePicker
                    defaultTime={this.props.datetime}
                    ref='time'
                    hintText={this.props.timeHintText}
                    onChange={(event, date) => this.onChange(date) }
                    mode='landscape'
                    style={{ width: '50px' }}
                    format='24hr'/>
            </div>
        );
    }
});

export default DateTimePicker;
