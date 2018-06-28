import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string } from 'prop-types';

// Actions

import { getSearchValue } from '../../actions/index';

class SchedulerHeader extends Component {

    onChange = (event) => {
        const { dispatch } = this.props;

        dispatch(getSearchValue(event.target.value.toLowerCase()));
    }

    render () {
        const { searchValue } = this.props;

        return (
            <header>
                <h1>Планировщик задач</h1>
                <input
                    placeholder = 'Поиск'
                    type = 'text'
                    value = { searchValue }
                    onChange = { this.onChange }
                />
            </header>
        );
    }
}

SchedulerHeader.propTypes = {
    searchValue: string.isRequired,
};

const mapStateToProps = (state) => {
    return {
        searchValue: state.searchValue,
    };
};

export default connect(mapStateToProps)(SchedulerHeader);
