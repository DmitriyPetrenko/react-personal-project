import React, { Component } from 'react';

// Components
import Task from '../Task/index';

class TaskItem extends Component {

    render () {
        const { tasks, filterTask, maxLength, handleFilterTasks, handleRemoveTask, handleKeyPressed } = this.props;
        const pattern = new RegExp(filterTask, "ig");
        const content = tasks
            .filter(({ message }) => message.toLowerCase().match(pattern))
            .map(({ id, message, completed, favorite }) => {
                return (
                    <Task
                        completed = { completed }
                        favorite = { favorite }
                        handleFilterTasks = { handleFilterTasks }
                        handleKeyPressed = { handleKeyPressed }
                        handleRemoveTask = { handleRemoveTask }
                        id = { id }
                        key = { id }
                        maxLength = { maxLength }
                        message = { message }
                    />
                );
            });

        return (
            <ul>
                {tasks.length > 0 && content}
            </ul>
        );
    }
}

export default TaskItem;
