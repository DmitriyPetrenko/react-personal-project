import React, { Component } from 'react';
import { number, array } from 'prop-types';

// Components
import SchedulerHeader from '../SchedulerHeader/index';
import SchedulerBody from '../SchedulerBody/index';
import SchedulerFooter from '../SchedulerFooter/index';

// Styles
import Styles from './styles.m.css';

// Instruments
import { getIdTask, getTaskIndex, sortTasksByDate } from '../../instruments/helpers';

class Scheduler extends Component {
    constructor (props) {
        super(props);
        this.state = {
            tasks:        [],
            messageValue: '',
            allCompleted: false,
            filterTask:   '',
        };
    }

    handleMessageChange = (messageValue) => {

        this.setState({
            messageValue,
        });
    }

    handlerSubmit = () => {
        const message = this.state.messageValue;
        const id = getIdTask(this.props.alphabet);

        if (message.trim() === '') {
            return;
        }
        this.setState((prevState) => ({
            tasks: [{
                id,
                message,
                completed: false,
                favorite:  false,
                created:   new Date(),
            }, ...prevState.tasks],
            messageValue: '',
            allCompleted: false,
        }));
    }

    handleSortTasks = (property, id) => {
        let newState = [];
        const favorite = [];
        const completed = [];
        const other = [];
        const tasks = [...this.state.tasks];

        tasks.sort(sortTasksByDate);
        const index = getTaskIndex(tasks, id);

        tasks[index][property] = !tasks[index][property];
        const tasksCompleted = tasks.every((task) => {
            return task.completed;
        });

        tasks.forEach((task) => {
            if (task.favorite && !task.completed) {
                favorite.push(task);
            }
            if (task.completed) {
                completed.push(task);
            }
            if (!task.favorite && !task.completed) {
                other.push(task);
            }
        });

        newState = [...favorite, ...other, ...completed];
        if (!this.state.allCompleted && !tasksCompleted) {
            this.setState({
                tasks: newState,
            });
        } else if (tasksCompleted) {
            this.setState({
                tasks:        newState,
                allCompleted: true,
            });
        } else {
            this.setState({
                tasks:        newState,
                allCompleted: false,
            });
        }
    }


    handleRemoveTask = (id) => {
        const tasks = [...this.state.tasks];
        const index = getTaskIndex(tasks, id);

        tasks.splice(index, 1);
        this.setState({
            tasks,
        });
    }

    handleKeyPressed = (id, message) => {
        const tasks = [...this.state.tasks];
        const index = getTaskIndex(tasks, id);

        tasks[index].message = message;
        this.setState({
            tasks,
        });
    }

    handleCompletedTasks = () => {
        const tasks = [...this.state.tasks];
        const tasksCompleted = tasks.every((task) => {
            return task.completed;
        });

        if (tasksCompleted) {
            return;
        }
        tasks.forEach((task) => {
            task.completed = true;
        });
        this.setState({
            tasks,
            allCompleted: true,
        });
    }

    handleSearchTask = (filterTask) => {

        this.setState({
            filterTask,
        });
    }

    render () {
        const { filterTask, tasks, messageValue, allCompleted } = this.state;

        return (
            <div className = { Styles.scheduler }>
                <main>
                    <SchedulerHeader
                        filterTask = { filterTask }
                        handleSearchTask = { this.handleSearchTask }
                    />
                    <SchedulerBody
                        className = { Styles.overlay }
                        filterTask = { filterTask }
                        handleKeyPressed = { this.handleKeyPressed }
                        handleMessageChange = { this.handleMessageChange }
                        handleRemoveTask = { this.handleRemoveTask }
                        handlerSubmit = { this.handlerSubmit }
                        handleSortTasks = { this.handleSortTasks }
                        maxLength = { this.props.maxLength }
                        messageValue = { messageValue }
                        tasks = { tasks }
                    />
                    <SchedulerFooter
                        allCompleted = { allCompleted }
                        className = { Styles.completeAllTasks }
                        handleCompletedTasks = { this.handleCompletedTasks }
                    />
                </main>
            </div>
        );
    }
}

Scheduler.propTypes = {
    alphabet:  array,
    maxLength: number,
};

export default Scheduler;
