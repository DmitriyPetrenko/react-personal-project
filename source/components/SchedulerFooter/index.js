import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string, arrayOf, shape, bool } from 'prop-types';

// Actions

import { updateTasks } from '../../actions';

// Components
import Checkbox from '../../theme/assets/Checkbox';

class SchedulerFooter extends Component {

    static propTypes = {
        allTasksCompleted: bool.isRequired,
        tasks:             arrayOf(shape({
            id:        string.isRequired,
            message:   string.isRequired,
            favorite:  bool.isRequired,
            completed: bool.isRequired,
        }).isRequired).isRequired,
    };

    constructor (props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick () {
        const {
            dispatch,
            allTasksCompleted,
        } = this.props;

        if (allTasksCompleted) {
            return;
        }

        const updatedTasks = [...this.props.tasks];

        updatedTasks.forEach((task) => task.completed = true);

        dispatch(updateTasks({
            updatedTasks,
            updatedStateTasks: updatedTasks,
        }));
    }

    render () {
        const { variant, allTasksCompleted } = this.props;

        return (
            <footer>
                <div>
                    <Checkbox
                        checked = { allTasksCompleted }
                        color1 = '#000'
                        color2 = '#fff'
                        onClick = { this.handleClick }
                    />
                </div>
                <span className = { variant }>Все задачи выполнены</span>
            </footer>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        allTasksCompleted: state.allTasksCompleted,
        tasks:             state.tasks.items,
    };
};

export default connect(mapStateToProps)(SchedulerFooter);
