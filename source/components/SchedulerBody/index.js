import React, { Component } from 'react';

// Components
import AddTask from '../AddTask/index';
import TaskItem from '../TaskItem/index';

class SchedulerBody extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section>
        <AddTask
          value={this.props.value}
          handlerSubmit={this.props.handlerSubmit}
          handleMessageChange={this.props.handleMessageChange}
          maxLength={this.props.maxLength}
        />
        <div className={this.props.className}>
          <TaskItem
            tasks={this.props.tasks}
            filterTask={this.props.filterTask}
            maxLength={this.props.maxLength}
            handleFilterTasks={this.props.handleFilterTasks}
            handleRemoveTask={this.props.handleRemoveTask}
            handleKeyPressed={this.props.handleKeyPressed}
          />
        </div>
      </section>
    );
  }
}

export default SchedulerBody;
