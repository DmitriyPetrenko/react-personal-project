import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string, arrayOf, shape, bool } from 'prop-types';

// Actions

import { updateTask } from '../../actions/index';

// Components
import Checkbox from '../../theme/assets/Checkbox';

class SchedulerFooter extends Component {

    onClick = () => {
        const { dispatch } = this.props;
        const tasks = [...this.props.tasks];
        const tasksCompleted = tasks.every((task) => task.completed);

        if (tasksCompleted) {
            return;
        }

        tasks.forEach((task) => task.completed = true);

        dispatch(updateTask('', tasks, tasks));
    }

    render () {
        const { className, allTasksCompleted } = this.props;

        return (
            <footer>
                <div>
                    <Checkbox
                        checked = { allTasksCompleted }
                        color1 = '#000'
                        color2 = '#fff'
                        onClick = { this.onClick }
                    />
                </div>
                <span className = { className }>Все задачи выполнены</span>
            </footer>
        );
    }
}

SchedulerFooter.propTypes = {
    allTasksCompleted: bool.isRequired,
    tasks:             arrayOf(shape({
        id:        string.isRequired,
        message:   string.isRequired,
        favorite:  bool.isRequired,
        completed: bool.isRequired,
    }).isRequired).isRequired,
};

const mapStateToProps = (state) => {
    return {
        allTasksCompleted: state.allTasksCompleted,
        tasks:             state.tasks.items,
    };
};

export default connect(mapStateToProps)(SchedulerFooter);
