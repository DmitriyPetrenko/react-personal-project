import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string } from 'prop-types';

// Actions

import { getSearchValue } from '../../actions';

class SchedulerHeader extends Component {

    static propTypes = {
        searchValue: string.isRequired,
    };

    constructor (props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange (event) {
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
                    onChange = { this.handleChange }
                />
            </header>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        searchValue: state.searchValue,
    };
};

export default connect(mapStateToProps)(SchedulerHeader);
