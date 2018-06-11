import React, { Component } from 'react';
import SchedulerHeader from '../SchedulerHeader/index';
import SchedulerBody from '../SchedulerBody/index';
import SchedulerFooter from '../SchedulerFooter/index';
import Checkbox from '../../theme/assets/Checkbox';
import Styles from './styles.m.css';

// Instruments
import { getDisplayName, getRandomInt, getIdTask, getTaskIndex } from '../../instruments/helpers';

class Scheduler extends Component {

  constructor (props) {
    super(props);
    this.state = {
      tasks: [],
      value: '',
      allCompleted: false,
      filterTask: ''
    };

  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  handleMessageChange = (message) => {
    this.setState({
      value: message
    });
  }

  handlerSubmit = () => {
    let message = this.state.value;
    const id = getIdTask(this.props.alphabet);
    if(message.trim() === '') return;
    const task =  {
            "id": id,
            "message": message,
            "completed": false,
            "favorite": false,
            "created": new Date()
    };
    this.setState((prevState) => ({
      tasks: [task, ...prevState.tasks],
      value: ''
    }));

  }

  handleFilterTasks = (type, task) => {
    let newState = [],
        tasks = [...this.state.tasks],
        index,
        favorite,
        completed,
        other,
        tasksCompleted;

    tasks.sort(function(a, b) {
      if (a.created > b.created) return -1;
      if (a.created < b.created) return 1;
      return 0;
    });
    index = getTaskIndex(tasks, task);
    tasks[index][type] = !tasks[index][type];
    tasksCompleted = tasks.every(function(task) {
      return task.completed
    });
    favorite = tasks.filter((task) => {
      return task.favorite && !task.completed;
    });
    completed = tasks.filter((task) => {
      return task.completed;
    });
    other = tasks.filter((task) => {
      return !task.favorite && !task.completed;
    });
    newState = [...favorite, ...other, ...completed];
    if(!this.state.allCompleted && !tasksCompleted) {
      this.setState({
        tasks: newState
      });
    } else if (tasksCompleted) {
      this.setState({
        tasks: newState,
        allCompleted: true
      });
    } else {
      this.setState({
        tasks: newState,
        allCompleted: false
      });
    }

  }

  handleRemoveTask = (task) => {
    let tasks = [...this.state.tasks];
    let index = getTaskIndex(tasks, task);
    tasks.splice(index, 1);

    this.setState({
      tasks
    });
  }

  handleKeyPressed = (task, message) => {
    let tasks = [...this.state.tasks];
    let index = getTaskIndex(tasks, task);
    tasks[index]["message"] = message;
    this.setState({
      tasks
    });
  }

  handleAllTasksCompleted = () => {
    let tasks = [...this.state.tasks];
    let tasksCompleted = tasks.every(function(task) {
      return task.completed
    });
    if(tasksCompleted) return;
    tasks.map(function(task) {
      task.completed = true;
    });

    this.setState({
      tasks,
      allCompleted: true
    });
  }

  handleSearchTask = (value) => {
    this.setState({
      filterTask: value
    })
  }

  render() {
    return (
      <div className={Styles.scheduler}>
        <main>
          <SchedulerHeader
            filterTask={this.state.filterTask}
            handleSearchTask={this.handleSearchTask}
          />
          <SchedulerBody
            className={Styles.overlay}
            value={this.state.value}
            filterTask={this.state.filterTask}
            handlerSubmit={this.handlerSubmit}
            handleMessageChange={this.handleMessageChange}
            maxLength={this.props.maxLength}
            tasks={this.state.tasks}
            handleFilterTasks={this.handleFilterTasks}
            handleRemoveTask={this.handleRemoveTask}
            handleKeyPressed={this.handleKeyPressed}
          />
          <SchedulerFooter
            allCompleted={this.state.allCompleted}
            handleAllTasksCompleted={this.handleAllTasksCompleted}
            className={Styles.completeAllTasks}
          />
        </main>
      </div>
    );
  }
}

export default Scheduler;
