import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    string,
    arrayOf,
    shape,
    bool
} from 'prop-types';

// Actions
import { allTasksCompleted } from '../../actions/index';

// Components
import Task from '../Task/index';

class TaskList extends Component {
    componentDidUpdate () {
        const {
            tasks,
            dispatch,
        } = this.props;
        const tasksCompleted = tasks.every((task) => task.completed);

        if (tasksCompleted) {
            return dispatch(allTasksCompleted(true));
        }

        return dispatch(allTasksCompleted(false));
    }

    render () {
        const {
            tasks,
            searchValue,
            className,
        } = this.props;
        const pattern = new RegExp(searchValue, "ig");
        const content = tasks
            .filter(({ message }) => message.toLowerCase().match(pattern))
            .map(({ id, message, completed, favorite }) => {
                return (
                    <Task
                        completed = { completed }
                        favorite = { favorite }
                        id = { id }
                        key = { id }
                        message = { message }
                    />
                );
            });

        return (
            <div className = { className }>
                <ul>
                    { content }
                </ul>
            </div>
        );
    }
}

TaskList.propTypes = {
    className:   string.isRequired,
    searchValue: string.isRequired,
    tasks:       arrayOf(shape({
        id:        string.isRequired,
        message:   string.isRequired,
        favorite:  bool.isRequired,
        completed: bool.isRequired,
    }).isRequired).isRequired,
};

const mapStateToProps = (state) => {
    return {
        searchValue: state.searchValue,
        tasks:       state.tasks.items,
    };
};

export default connect(mapStateToProps)(TaskList);
