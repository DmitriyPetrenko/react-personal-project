import React, { Component } from 'react';

class SchedulerHead extends Component {
    shouldComponentUpdate (nextProps) {
        if (this.props.value !== nextProps.value) {
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

    render () {
        return (
            <form onSubmit = { this.onSubmit }>
                <input
                    maxLength = { this.props.maxLength }
                    placeholder = 'Описание моей новой задачи'
                    type = 'text'
                    value = { this.props.value }
                    onChange = { this.onChange }
                />
                <button>Добавить задачу</button>
            </form>
        );
    }
}

export default SchedulerHead;
