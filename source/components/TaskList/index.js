import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    string,
    arrayOf,
    shape,
    bool
} from 'prop-types';

// Actions
import { allTasksCompleted } from '../../actions';

// Components
import Task from '../Task';

class TaskList extends Component {

    static propTypes = {
        searchValue: string.isRequired,
        tasks:       arrayOf(shape({
            id:        string.isRequired,
            message:   string.isRequired,
            favorite:  bool.isRequired,
            completed: bool.isRequired,
        }).isRequired).isRequired,
        variant: string.isRequired,
    };

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
            variant,
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
            <div className = { variant }>
                <ul>
                    { content }
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        searchValue: state.searchValue,
        tasks:       state.tasks.items,
    };
};

export default connect(mapStateToProps)(TaskList);
