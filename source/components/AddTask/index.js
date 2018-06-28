import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string } from 'prop-types';

// Actions
import {
    getMessageValue,
    addTask
} from '../../actions/index';

//Config
import { MAX_LENGTH } from '../../config/index';

class AddTask extends Component {

    onChange = (event) => {
        const { dispatch } = this.props;

        dispatch(getMessageValue(event.target.value));
    }

    onSubmit = (event) => {
        event.preventDefault();

        const { newTaskMessage, dispatch } = this.props;

        if (newTaskMessage.trim() === '') {
            return;
        }

        const task = {
            message:   newTaskMessage,
            completed: false,
            favorite:  false,
            created:   Date.now(),
        };

        dispatch(addTask('', task));
    }

    render () {
        const { newTaskMessage } = this.props;

        return (
            <form
                onSubmit = { this.onSubmit }>
                <input
                    maxLength = { MAX_LENGTH }
                    placeholder = 'Описание моей новой задачи'
                    type = 'text'
                    value = { newTaskMessage }
                    onChange = { this.onChange }
                />
                <button>Добавить задачу</button>
            </form>
        );
    }
}

AddTask.propTypes = {
    newTaskMessage: string.isRequired,
};

const mapStateToProps = (state) => {
    return {
        newTaskMessage: state.newTaskMessage,
    };
};

export default connect(mapStateToProps)(AddTask);
