import React, { Component } from 'react';

// Components
import Star from '../../theme/assets/Star';
import Edit from '../../theme/assets/Edit';
import Remove from '../../theme/assets/Remove';
import Checkbox from '../../theme/assets/Checkbox';

// Styles
import Styles from './styles.m.css';


class Task extends Component {
    constructor (props) {
        super(props);
        this.input = React.createRef();
        this.state = {
            editMessage: this.props.message,
            isEditing:   false,
        };
    }

    shouldComponentUpdate (nextProps, nextState) {
        if (this.state.editMessage !== nextState.editMessage) {
            return true;
        }
        if (this.state.isEditing !== nextState.isEditing) {
            return true;
        }
        if (this.props.completed !== nextProps.completed) {
            return true;
        }
        if (this.props.favorite !== nextProps.favorite) {
            return true;
        }

        return false;
    }

    componentDidUpdate (prevProps, prevState) {
        !prevState.isEditing && this.input.current.focus();
    }

    onKeyPressed = (task) => (event) => {
        if (event.keyCode === 27 || event.keyCode === 13) {
            let isEditing = this.state.isEditing;

            isEditing = !isEditing;
            if (event.keyCode === 27) {
                this.setState({
                    editMessage: this.props.message,
                });
            }
            if (event.keyCode === 13) {
                this.props.handleKeyPressed(task, this.state.editMessage);
            }
            this.setState({
                isEditing,
            });
        }
    }

    onToggleEdit = () => {
        let isEditing = this.state.isEditing;

        isEditing = !isEditing;
        this.setState({
            editMessage: this.props.message,
            isEditing,
        });
    }

    onRemove = (task) => () => {
        this.props.handleRemoveTask(task);
    }

    onChange = (event) => {
        this.setState({
            editMessage: event.target.value,
        });
    }

    onFilterTasks = (type, task) => () => {
        this.props.handleFilterTasks(type, task);
    }

    render () {
        const { id, completed, favorite, maxLength } = this.props;

        return (
            <li className = 'Task'>
                <div className = { Styles.task }>
                    <div className = { Styles.content }>
                        <div className = { Styles.complete }>
                            <Checkbox
                                checked = { completed }
                                color1 = '#3B8EF3'
                                color2 = '#fff'
                                onClick = { this.onFilterTasks('completed', id) }
                            />
                        </div>
                        <input
                            disabled = { !this.state.isEditing }
                            maxLength = { maxLength }
                            ref = { this.input }
                            type = 'text'
                            value = { this.state.editMessage }
                            onChange = { this.onChange }
                            onKeyDown = { this.onKeyPressed(id) }
                        />
                    </div>
                    <div className = { Styles.actions }>
                        <Star
                            inlineBlock
                            checked = { favorite }
                            className = { Styles.setPriority }
                            color1 = '#3B8EF3'
                            color2 = '#000'
                            onClick = { this.onFilterTasks('favorite', id) }
                        />
                        <Edit
                            inlineBlock
                            className = { Styles.edit }
                            color1 = '#3B8EF3'
                            color2 = '#000'
                            onClick = { this.onToggleEdit }
                        />
                        <Remove
                            inlineBlock
                            color1 = '#3B8EF3'
                            color2 = '#000'
                            onClick = { this.onRemove(id) }
                        />
                    </div>
                </div>
            </li>
        );
    }
}

export default Task;