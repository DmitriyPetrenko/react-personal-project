import React, { Component } from 'react';

// Components
import AddTask from '../AddTask/index';
import TaskItem from '../TaskItem/index';

class SchedulerBody extends Component {

    render () {
        return (
            <section>
                <AddTask
                    handleMessageChange = { this.props.handleMessageChange }
                    handlerSubmit = { this.props.handlerSubmit }
                    maxLength = { this.props.maxLength }
                    value = { this.props.value }
                />
                <div className = { this.props.className }>
                    <TaskItem
                        filterTask = { this.props.filterTask }
                        handleFilterTasks = { this.props.handleFilterTasks }
                        handleKeyPressed = { this.props.handleKeyPressed }
                        handleRemoveTask = { this.props.handleRemoveTask }
                        maxLength = { this.props.maxLength }
                        tasks = { this.props.tasks }
                    />
                </div>
            </section>
        );
    }
}

export default SchedulerBody;
