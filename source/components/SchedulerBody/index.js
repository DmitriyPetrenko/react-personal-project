import React, { Component } from 'react';
import { string, func, array } from 'prop-types';

// Components
import AddTask from '../AddTask/index';
import TaskItem from '../TaskItem/index';

class SchedulerBody extends Component {

    render () {
        const { handleMessageChange, handlerSubmit, maxLength, messageValue, className, filterTask, handleSortTasks, handleKeyPressed, handleRemoveTask, tasks } = this.props;

        return (
            <section>
                <AddTask
                    handleMessageChange = { handleMessageChange }
                    handlerSubmit = { handlerSubmit }
                    maxLength = { maxLength }
                    messageValue = { messageValue }
                />
                <div className = { className }>
                    <TaskItem
                        filterTask = { filterTask }
                        handleKeyPressed = { handleKeyPressed }
                        handleRemoveTask = { handleRemoveTask }
                        handleSortTasks = { handleSortTasks }
                        maxLength = { maxLength }
                        tasks = { tasks }
                    />
                </div>
            </section>
        );
    }
}

SchedulerBody.propTypes = {
    filterTask:          string,
    handleKeyPressed:    func,
    handleMessageChange: func,
    handleRemoveTask:    func,
    handlerSubmit:       func,
    handleSortTasks:     func,
    messageValue:        string,
    tasks:               array,
};

export default SchedulerBody;
