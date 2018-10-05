// Core
import React from 'react';
import { bool } from 'prop-types';
import { connect } from 'react-redux';

// Instruments
import Styles from './styles.m.css';

function Spinner ({ spin }) {
    return spin && <div className = { Styles.spinner } />;
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
