import React, { Component } from 'react';
import { connect } from 'react-redux';

// Components
import SchedulerHeader from '../SchedulerHeader';
import SchedulerBody from '../SchedulerBody';
import SchedulerFooter from '../SchedulerFooter';
import Spinner from '../Spinner';

// Styles
import Styles from './styles.m.css';

// Actions

import { fetchTasks } from '../../actions';

class Scheduler extends Component {

    componentDidMount () {
        this.props.dispatch(fetchTasks());
    }

    render () {
        return (
            <div className = { Styles.scheduler }>
                <main>
                    <SchedulerHeader />
                    <SchedulerBody
                        variant = { Styles.overlay }
                    />
                    <SchedulerFooter
                        variant = { Styles.completeAllTasks }
                    />
                    <Spinner />
                </main>
            </div>
        );
    }
}

export default connect()(Scheduler);
