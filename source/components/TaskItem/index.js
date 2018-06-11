import React, { Component } from 'react';
import Task from '../Task/index';

class TaskItem extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  render() {
    const { tasks, filterTask , maxLength, handleFilterTasks, handleEditTask, handleRemoveTask, handleMessageOfTaskChange, handleKeyPressed } = this.props;
    const pattern = new RegExp(filterTask, "ig");
    const content = tasks
                    .filter(({message}) => message.toLowerCase().match(pattern))
                    .map(({id, message, completed, favorite, isEditing}, index) => {
                        return (
                          <Task
                            key={id}
                            id={id}
                            message={message}
                            completed={completed}
                            favorite={favorite}
                            isEditing={isEditing}
                            maxLength={maxLength}
                            handleRemoveTask={handleRemoveTask}
                            handleKeyPressed={handleKeyPressed}
                            handleFilterTasks={handleFilterTasks}
                          />
                        );
                    });

    return (
      <ul>
        {(tasks.length > 0) && content}
      </ul>
    );
  }
}

export default TaskItem;
