import React, { Component } from 'react';
import { connect } from 'react-redux';

// Components
import SchedulerHeader from '../SchedulerHeader/index';
import SchedulerBody from '../SchedulerBody/index';
import SchedulerFooter from '../SchedulerFooter/index';
import Spinner from '../Spinner/index';

// Styles
import Styles from './styles.m.css';

// Actions

import { fetchTasks } from '../../actions/index';

class Scheduler extends Component {

    componentWillMount () {
        this.props.dispatch(fetchTasks());
    }

    render () {
        return (
            <div className = { Styles.scheduler }>
                <main>
                    <SchedulerHeader />
                    <SchedulerBody
                        className = { Styles.overlay }
                    />
                    <SchedulerFooter
                        className = { Styles.completeAllTasks }
                    />
                    <Spinner />
                </main>
            </div>
        );
    }
}

export default connect()(Scheduler);
