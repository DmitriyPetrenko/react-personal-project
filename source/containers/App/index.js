// Core
import React, { Component } from 'react';
import Scheduler from '../../components/Scheduler/index';
import { hot } from 'react-hot-loader';

@hot(module)
export default class App extends Component {
    render () {
        return (
            <Scheduler />
        );
    }
}
