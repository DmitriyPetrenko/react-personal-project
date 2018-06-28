import React, { Component } from 'react';
import { connect } from 'react-redux';

// Actions
import {
    updateTask,
    deleteTask
} from '../../actions/index';

// Components
import Star from '../../theme/assets/Star';
import Edit from '../../theme/assets/Edit';
import Remove from '../../theme/assets/Remove';
import Checkbox from '../../theme/assets/Checkbox';

// Styles
import Styles from './styles.m.css';

//Config
import { MAX_LENGTH } from '../../config/index';

class Task extends Component {
    constructor (props) {
        super(props);
        this.input = React.createRef();
        this.state = {
            isEditing:        false,
            editMessageValue: this.props.message,
        };
    }

    componentDidUpdate (prevState) {
        !prevState.isEditing && this.input.current.focus();
    }

    onChange = (event) => {
        this.setState({
            editMessageValue: event.target.value,
        });
    }

    onSort = (property, taskId) => () => {
        const {
            dispatch,
            tasks,
        } = this.props;
        const newStateOfTheTasks = tasks.filter((task) => {
            task.id === taskId ? { task, ...task[property] = !task[property] } : task;

            return task.id === taskId;
        });

        dispatch(updateTask('', newStateOfTheTasks, tasks));
    }

    onToggleEdit = () => {
        this.setState((prevState) => {
            return {
                editMessageValue: this.props.message,
                isEditing:        !prevState.isEditing,
            };
        });
    }

    onEdit = (taskId) => (event) => {
        if (event.keyCode === 27 || event.keyCode === 13) {
            const {
                dispatch,
                message,
                tasks,
            } = this.props;

            if (event.keyCode === 27) {
                this.setState({
                    editMessageValue: message,
                });
            }
            if (event.keyCode === 13) {
                const newStateOfTheTasks = tasks.filter((task) => {
                    task.id === taskId ? { task, ...task.message = this.state.editMessageValue } : task;

                    return task.id === taskId;
                });

                dispatch(updateTask('', newStateOfTheTasks, tasks));
            }
            this.setState((prevState) => {
                return {
                    isEditing: !prevState.isEditing,
                };
            });
        }
    }

    onRemove = (taskId) => () => {
        const { tasks, dispatch } = this.props;
        const newArrOfTheTasks = tasks.filter((task) => task.id !== taskId);

        dispatch(deleteTask(taskId, newArrOfTheTasks));
    }

    render () {
        const {
            id,
            completed,
            favorite,
        } = this.props;
        const {
            isEditing,
            editMessageValue,
        } = this.state;

        return (
            <li className = 'Task'>
                <div className = { Styles.task }>
                    <div className = { Styles.content }>
                        <div className = { Styles.complete }>
                            <Checkbox
                                checked = { completed }
                                color1 = '#3B8EF3'
                                color2 = '#fff'
                                onClick = { this.onSort('completed', id) }
                            />
                        </div>
                        <input
                            disabled = { !isEditing }
                            maxLength = { MAX_LENGTH }
                            ref = { this.input }
                            type = 'text'
                            value = { editMessageValue }
                            onChange = { this.onChange }
                            onKeyDown = { this.onEdit(id) }
                        />
                    </div>
                    <div className = { Styles.actions }>
                        <Star
                            inlineBlock
                            checked = { favorite }
                            className = { Styles.setPriority }
                            color1 = '#3B8EF3'
                            color2 = '#000'
                            onClick = { this.onSort('favorite', id) }
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

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks.items,
    };
};

export default connect(mapStateToProps)(Task);
