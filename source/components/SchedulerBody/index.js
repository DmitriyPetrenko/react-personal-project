import React, { Component } from 'react';
import { connect } from 'react-redux';

// Components
import AddTask from '../AddTask/index';
import TaskList from '../TaskList/index';

class SchedulerBody extends Component {

    render () {
        const { className } = this.props;

        return (
            <section>
                <AddTask />
                <TaskList
                    className = { className }
                />
            </section>
        );
    }
}

export default connect()(SchedulerBody);
