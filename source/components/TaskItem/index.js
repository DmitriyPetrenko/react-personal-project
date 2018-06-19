import React, { Component } from 'react';

// Components
import Task from '../Task/index';

class TaskItem extends Component {

    render () {
        const { tasks, filterTask, maxLength, handleSortTasks, handleRemoveTask, handleKeyPressed } = this.props;
        const pattern = new RegExp(filterTask, "ig");
        const content = tasks
            .filter(({ message }) => message.toLowerCase().match(pattern))
            .map(({ id, message, completed, favorite }) => {
                return (
                    <Task
                        completed = { completed }
                        favorite = { favorite }
                        handleKeyPressed = { handleKeyPressed }
                        handleRemoveTask = { handleRemoveTask }
                        handleSortTasks = { handleSortTasks }
                        id = { id }
                        key = { id }
                        maxLength = { maxLength }
                        message = { message }
                    />
                );
            });

        return (
            <ul>
                {content}
            </ul>
        );
    }
}

export default TaskItem;
