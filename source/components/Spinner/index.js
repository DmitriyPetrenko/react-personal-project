// Core
import React, { Component } from 'react';
import { bool } from 'prop-types';
import { connect } from 'react-redux';

// Instruments
import Styles from './styles.m.css';

class Spinner extends Component {

    render () {
        const { spin } = this.props;

        return spin ? <div className = { Styles.spinner } /> : null;
    }
}

Spinner.propTypes = {
    spin: bool.isRequired,
};

const mapStateToProps = (state) => {
    const { isFetching } = state.tasks;

    return {
        spin: isFetching,
    };
};

export default connect(mapStateToProps)(Spinner);
