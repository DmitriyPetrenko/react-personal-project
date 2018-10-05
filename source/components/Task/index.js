import React, { Component } from 'react';
import { connect } from 'react-redux';

// Actions
import {
    updateTasks,
    deleteTask
} from '../../actions';

// Components
import Star from '../../theme/assets/Star';
import Edit from '../../theme/assets/Edit';
import Remove from '../../theme/assets/Remove';
import Checkbox from '../../theme/assets/Checkbox';

// Styles
import Styles from './styles.m.css';

//Config
import { MAX_LENGTH } from '../../config';

class Task extends Component {
    constructor (props) {
        super(props);
        this.input = React.createRef();
        this.state = {
            isEditing:        false,
            editMessageValue: this.props.message,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleToggleEdit = this.handleToggleEdit.bind(this);
    }

    componentDidUpdate (prevState) {
        !prevState.isEditing && this.input.current.focus();
    }

    handleChange (event) {
        this.setState({
            editMessageValue: event.target.value,
        });
    }

    handleToggleAttr = (property, taskId) => () => {
        const {
            dispatch,
            tasks,
        } = this.props;
        const updatedAttrTask = tasks.filter((task) => task.id === taskId ? { task, ...task[property] = !task[property] } : task);

        dispatch(updateTasks({
            updatedTasks:      updatedAttrTask,
            updatedStateTasks: tasks,
        }));
    }

    handleToggleEdit () {
        this.setState((prevState) => {
            return {
                editMessageValue: this.props.message,
                isEditing:        !prevState.isEditing,
            };
        });
    }

    handleEdit = (taskId) => (event) => {
        if (event.keyCode === 27 || event.keyCode === 13) {
            const {
                dispatch,
                message,
                tasks,
            } = this.props;

            switch (event.keyCode) {
                case 27: {
                    this.setState({
                        editMessageValue: message,
                    });

                    break;
                }
                case 13: {
                    const updatedMessageTask = tasks.filter((task) => task.id === taskId ? { task, ...task.message = this.state.editMessageValue } : task);

                    dispatch(updateTasks({
                        updatedTasks:      updatedMessageTask,
                        updatedStateTasks: tasks,
                    }));

                    break;
                }
                default: {
                    break;
                }
            }

            this.setState((prevState) => {
                return {
                    isEditing: !prevState.isEditing,
                };
            });
        }
    }

    handleRemove = (taskId) => () => {
        const { tasks, dispatch } = this.props;
        const updatedStateTasks = tasks.filter((task) => task.id !== taskId);

        dispatch(deleteTask(taskId, updatedStateTasks));
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
                                onClick = { this.handleToggleAttr('completed', id) }
                            />
                        </div>
                        <input
                            disabled = { !isEditing }
                            maxLength = { MAX_LENGTH }
                            ref = { this.input }
                            type = 'text'
                            value = { editMessageValue }
                            onChange = { this.handleChange }
                            onKeyDown = { this.handleEdit(id) }
                        />
                    </div>
                    <div className = { Styles.actions }>
                        <Star
                            inlineBlock
                            checked = { favorite }
                            className = { Styles.setPriority }
                            color1 = '#3B8EF3'
                            color2 = '#000'
                            onClick = { this.handleToggleAttr('favorite', id) }
                        />
                        <Edit
                            inlineBlock
                            className = { Styles.edit }
                            color1 = '#3B8EF3'
                            color2 = '#000'
                            onClick = { this.handleToggleEdit }
                        />
                        <Remove
                            inlineBlock
                            color1 = '#3B8EF3'
                            color2 = '#000'
                            onClick = { this.handleRemove(id) }
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
