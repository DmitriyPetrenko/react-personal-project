import React, { Component } from 'react';
import { string, func } from 'prop-types';

class SchedulerHeader extends Component {
    shouldComponentUpdate (nextProps) {
        if (this.props.filterTask !== nextProps.filterTask) {
            return true;
        }

        return false;
    }

    onChange = (event) => {
        this.props.handleSearchTask(event.target.value.toLowerCase());
    }

    render () {
        return (
            <header>
                <h1>Планировщик задач</h1>
                <input
                    placeholder = 'Поиск'
                    type = 'search'
                    value = { this.props.filterTask }
                    onChange = { this.onChange }
                />
            </header>
        );
    }
}

SchedulerFooter.propTypes = {
    filterTask:       string,
    handleSearchTask: func,
};

export default SchedulerHeader;
