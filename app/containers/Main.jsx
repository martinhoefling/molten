import React from 'react';

import EventListener from 'containers/EventListener';
import Toast from 'containers/Toast';
import TabHeaders from 'components/TabHeaders';

import styles from './Main.less';

const Main = React.createClass({
    render() {
        return (
            <div className={styles.this}>
                <TabHeaders/>
                {this.props.children}
                <EventListener/>
                <Toast/>
            </div>
        );
    }
});

export default Main;
