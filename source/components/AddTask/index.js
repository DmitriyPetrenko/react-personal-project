import React, { Component } from 'react';

class SchedulerHead extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(this.props.value !== nextProps.value) {
      return true;
    }

    return false;
  }

  onChange = (event) => {
    this.props.handleMessageChange(event.target.value);
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.props.handlerSubmit();
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input type="text" placeholder="Описание моей новой задачи" value={this.props.value} onChange={this.onChange} maxLength={this.props.maxLength}/>
        <button>Добавить задачу</button>
      </form>
    );
  }
}

export default SchedulerHead;
