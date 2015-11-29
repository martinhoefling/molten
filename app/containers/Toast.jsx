import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import ReactToastr, { ToastContainer } from 'react-toastr';
import classnames from 'classnames';

import styles from './Toast.less';

var ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);

const EVENT_LIST = [
    {
        regex: /salt\/auth/,
        text: event => `Minion ${event.data.id} authentication. Minion key status is "${event.data.act}"`
    },
    {
        regex: /salt\/minion\/(.*)\/start/,
        text: event => `Minion ${event.data.id} connected`
    },
    {
        regex: /salt\/key/,
        text: event => `Key for minion ${event.data.id} has now status "${event.data.act}"`
    },
    {
        regex: /salt\/job\/(.*)\/new/,
        text: event => `New job ${event.data.fun} targeting ${event.data.tgt} was published`
    },
    {
        regex: /salt\/job\/(.*)\/ret\/(.*)/,
        text: event => `Minion completed job ${event.data.fun}`
    },
    {
        regex: /salt\/run\/(.*)\/new/,
        text: event => `New runner job ${event.data.fun} was published`
    },
    {
        regex: /salt\/run\/(.*)\/ret/,
        text: event => `Runner completed job ${event.data.fun}`
    },
    {
        regex: /salt\/cloud\/(.*)\/creating/,
        text: (event, match) => `Starting creation of VM ${match[1]}`
    },
    {
        regex: /salt\/cloud\/(.*)\/deploying/,
        text: (event, match) => `Starting deployment of VM ${match[1]}`
    },
    {
        regex: /salt\/cloud\/(.*)\/requesting/,
        text: (event, match) => `Sending request for VM ${match[1]}`
    },
    {
        regex: /salt\/cloud\/(.*)\/querying/,
        text: (event, match) => `Checking if VM ${match[1]} was started`
    },
    {
        regex: /salt\/cloud\/(.*)\/tagging/,
        text: (event, match) => `Tagging VM ${match[1]}`
    },
    {
        regex: /salt\/cloud\/(.*)\/waiting_for_ssh/,
        text: (event, match) => `Trying to ssh into VM ${match[1]}`
    },
    {
        regex: /salt\/cloud\/(.*)\/created/,
        text: (event, match) => `Starting creation of VM ${match[1]}`
    },
    {
        regex: /salt\/cloud\/(.*)\/created/,
        text: (event, match) => `VM ${match[1]} created`
    },
    {
        regex: /salt\/cloud\/(.*)\/destroying/,
        text: (event, match) => `Starting destruction of VM ${match[1]}`
    },
    {
        regex: /salt\/cloud\/(.*)\/destroyed/,
        text: (event, match) => `VM ${match[1]} destroyed`
    },
    {
        regex: /[0-9]{20}/,
        ignore: true
    }
];

const Toast = React.createClass({
    propTypes: {
        enabled: React.PropTypes.bool.isRequired,
        events: React.PropTypes.array.isRequired
    },

    publishEvent(event) {
        var template = _.find(EVENT_LIST, function (item) {
                return event.tag.match(item.regex);
            }),
            match, text;

        if (template.ignore) {
            return;
        }
        if (!template) {
            console.log('No template found for event', event);
        }
        match = event.tag.match(template.regex);
        text = template.text(event, match);

        this.refs.container.info(text, '', {
            closeButton: true,
            showAnimation: 'animated fadeInDown',
            hideAnimation: 'animated fadeOutDown',
            timeOut: 5000
        });
    },

    componentWillReceiveProps(nextProps) {
        if (nextProps.enabled) {
            var newEvents = nextProps.events.slice(this.props.events.length);
            if (newEvents.length) {
                newEvents.forEach(this.publishEvent);
            }
        }
    },

    render() {
        if (!this.props.enabled) {
            return null;
        }

        return (
            <div>
                <ToastContainer
                    ref='container'
                    toastMessageFactory={ToastMessageFactory}
                    className={classnames('toast-top-right', styles.this)}/>
            </div>
        );
    }
});

function select(state) {
    return {
        enabled: !!state.Settings.eventsAsToasts,
        events: state.Events.events
    };
}

export default connect(select)(Toast);
