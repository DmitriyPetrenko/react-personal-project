import React, { Component } from 'react';
import Star from '../../theme/assets/Star';
import Edit from '../../theme/assets/Edit';
import Remove from '../../theme/assets/Remove';
import Checkbox from '../../theme/assets/Checkbox';
import Styles from './styles.m.css';


class Task extends Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();

    this.state= {
      editMessage: this.props.message,
      isEditing: false
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  componentDidUpdate(prevProps, prevState) {
    !prevState.isEditing && this.input.current.focus();
  }

  onKeyPressed = (task) => (event) => {
    if(event.keyCode === 27 || event.keyCode === 13) {
      let isEditing = this.state.isEditing;
      isEditing = !isEditing;
      if(event.keyCode === 27) {
        this.setState({
          editMessage: this.props.message
        });
      }
      if(event.keyCode === 13) {
        this.props.handleKeyPressed(task, this.state.editMessage);
      }
      this.setState({
        isEditing
      });
    }
  }

  onToggleEdit = (task) => () => {
    let isEditing = this.state.isEditing;
    isEditing = !isEditing;
    this.setState({
      editMessage: this.props.message,
      isEditing
    });
  }

  onRemove = (task) => () => {
    this.props.handleRemoveTask(task);
  }

  onChange = (task) => (event) => {
    this.setState({
      editMessage: event.target.value
    })
  }

  onFilterTasks = (type, task) => () => {
    this.props.handleFilterTasks(type, task)
  }

  render() {
    let { id, message, completed, favorite, isEditing, maxLength, ...other } = this.props;

    return (
      <li className="Task">
        <div className={Styles.task}>
          <div className={Styles.content}>
            <div className={Styles.complete}>
              <Checkbox
                color1 = '#3B8EF3'
                color2 = '#fff'
                checked = {completed}
                onClick = {this.onFilterTasks('completed', id)}
              />
            </div>
            {
              <input
                disabled = {!this.state.isEditing}
                ref={this.input}
                maxLength={maxLength}
                type="text"
                value={this.state.editMessage}
                onChange={this.onChange(id)}
                onKeyDown={this.onKeyPressed(id)}
                />
            }
          </div>
         <div className = { Styles.actions }>
           <Star
               inlineBlock
               className = { Styles.setPriority }
               color1 = '#3B8EF3'
               color2 = '#000'
               checked = {favorite}
               onClick = {this.onFilterTasks('favorite', id)} />
           <Edit
               inlineBlock
               className = { Styles.edit }
               color1 = '#3B8EF3'
               color2 = '#000'
               onClick = {this.onToggleEdit(id)} />
           <Remove
               inlineBlock
               color1 = '#3B8EF3'
               color2 = '#000'
               onClick = {this.onRemove(id)} />
         </div>
        </div>
        <div className={Styles.completed}>
          <div className={Styles.content}>

          </div>
        </div>
      </li>
    );
  }
}

export default Task;
