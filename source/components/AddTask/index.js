import React, { Component } from 'react';
import { connect } from 'react-redux';

// Actions
import {
    addTask
} from '../../actions';

//Config
import { MAX_LENGTH } from '../../config';

class AddTask extends Component {

    constructor (props) {
        super(props);
        this.state = {
            newTaskMessage: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange (event) {
        this.setState({
            newTaskMessage: event.target.value,
        });
    }

    handleSubmit (event) {
        event.preventDefault();

        const { dispatch } = this.props;

        if (this.state.newTaskMessage.trim() === '') {
            return;
        }

        const newTask = {
            message:   this.state.newTaskMessage,
            completed: false,
            favorite:  false,
            created:   Date.now(),
        };

        dispatch(addTask({ newTask }));

        this.setState({
            newTaskMessage: '',
        });
    }

    render () {
        return (
            <form
                onSubmit = { this.handleSubmit }>
                <input
                    maxLength = { MAX_LENGTH }
                    placeholder = 'Описание моей новой задачи'
                    type = 'text'
                    value = { this.state.newTaskMessage }
                    onChange = { this.handleChange }
                />
                <button>Добавить задачу</button>
            </form>
        );
    }
}

export default connect()(AddTask);
