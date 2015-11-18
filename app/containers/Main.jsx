import React from 'react';

import EventListener from 'containers/EventListener';
import TabHeaders from 'components/TabHeaders';

import styles from './Main.less';

const Main = React.createClass({
    render() {
        return (
            <div className={styles.this}>
                <TabHeaders/>
                {this.props.children}
                <EventListener/>
            </div>
        );
    }
});

export default Main;
