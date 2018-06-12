import React, { Component } from 'react';

// Components
import SchedulerHeader from '../SchedulerHeader/index';
import SchedulerBody from '../SchedulerBody/index';
import SchedulerFooter from '../SchedulerFooter/index';

// Styles
import Styles from './styles.m.css';

// Instruments
import { getIdTask, getTaskIndex } from '../../instruments/helpers';

class Scheduler extends Component {
    constructor (props) {
        super(props);
        this.state = {
            tasks:        [],
            value:        '',
            allCompleted: false,
            filterTask:   '',
        };
    }

    handleMessageChange = (message) => {
        const value = message;

        this.setState({
            value,
        });
    }

    handlerSubmit = () => {
        const message = this.state.value;
        const id = getIdTask(this.props.alphabet);
        const task =  {
            id,
            message,
            completed: false,
            favorite:  false,
            created:   new Date(),
        };

        if (message.trim() === '') {
            return;
        }
        this.setState((prevState) => ({
            tasks:        [task, ...prevState.tasks],
            value:        '',
            allCompleted: false,
        }));
    }

    handleFilterTasks = (type, id) => {
        let newState = [];
        const tasks = [...this.state.tasks];
        const taskItem = id;

        tasks.sort((a, b) => {
            if (a.created > b.created) {
                return -1;
            }
            if (a.created < b.created) {
                return 1;
            }

            return 0;
        });
        const index = getTaskIndex(tasks, taskItem);

        tasks[index][type] = !tasks[index][type];
        const tasksCompleted = tasks.every((task) => {
            return task.completed;
        });

        const favorite = tasks.filter((task) => {
            return task.favorite && !task.completed;
        });

        const completed = tasks.filter((task) => {
            return task.completed;
        });

        const other = tasks.filter((task) => {
            return !task.favorite && !task.completed;
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
        const taskItem = id;
        const index = getTaskIndex(tasks, taskItem);

        tasks.splice(index, 1);
        this.setState({
            tasks,
        });
    }

    handleKeyPressed = (id, message) => {
        const tasks = [...this.state.tasks];
        const taskItem = id;
        const index = getTaskIndex(tasks, taskItem);

        tasks[index].message = message;
        this.setState({
            tasks,
        });
    }

    handleAllTasksCompleted = () => {
        const tasks = [...this.state.tasks];
        const tasksCompleted = tasks.every((task) => {
            return task.completed;
        });

        if (tasksCompleted) {
            return;
        }
        tasks.map((task) => {
            task.completed = true;

            return false;
        });
        this.setState({
            tasks,
            allCompleted: true,
        });
    }

    handleSearchTask = (value) => {
        const filterTask = value;

        this.setState({
            filterTask,
        });
    }

    render () {
        return (
            <div className = { Styles.scheduler }>
                <main>
                    <SchedulerHeader
                        filterTask = { this.state.filterTask }
                        handleSearchTask = { this.handleSearchTask }
                    />
                    <SchedulerBody
                        className = { Styles.overlay }
                        filterTask = { this.state.filterTask }
                        handleFilterTasks = { this.handleFilterTasks }
                        handleKeyPressed = { this.handleKeyPressed }
                        handleMessageChange = { this.handleMessageChange }
                        handleRemoveTask = { this.handleRemoveTask }
                        handlerSubmit = { this.handlerSubmit }
                        maxLength = { this.props.maxLength }
                        tasks = { this.state.tasks }
                        value = { this.state.value }
                    />
                    <SchedulerFooter
                        allCompleted = { this.state.allCompleted }
                        className = { Styles.completeAllTasks }
                        handleAllTasksCompleted = { this.handleAllTasksCompleted }
                    />
                </main>
            </div>
        );
    }
}

export default Scheduler;
