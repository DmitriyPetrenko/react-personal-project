import React, { Component } from 'react';

class SchedulerHeader extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  onChange = (event) => {
    this.props.handleSearchTask(event.target.value.toLowerCase());
  }

  render() {
    return (
      <header>
        <h1>Планировщик задач</h1>
        <input type="search" value={this.props.filterTask} onChange={this.onChange} placeholder="Поиск"/>
      </header>
    );
  }
}

export default SchedulerHeader;
