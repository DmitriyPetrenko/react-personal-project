import React, { Component } from 'react';

// Components
import Checkbox from '../../theme/assets/Checkbox';

class SchedulerFooter extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(this.props.allCompleted !== nextProps.allCompleted) {
      return true;
    }

    return false;
  }

  onClick = () => {
    this.props.handleAllTasksCompleted();
  }

  render() {
    return (
      <footer>
        <div>
          <Checkbox
            color1 = '#000'
            color2 = '#fff'
            checked = {this.props.allCompleted}
            onClick = {this.onClick}
          />
        </div>
        <span className={this.props.className}>Все задачи выполнены</span>
      </footer>
    );
  }
}

export default SchedulerFooter;
