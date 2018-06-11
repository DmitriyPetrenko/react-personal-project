// Core
import React, { Component } from 'react';
import Scheduler from '../../components/Scheduler/index';
import { hot } from 'react-hot-loader';

const MAX_LENGTH = 50;
const ALPHABET = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

@hot(module)
export default class App extends Component {
    render () {
        return (
            <Scheduler
              maxLength = {MAX_LENGTH}
              alphabet = {ALPHABET}
            />
        );
    }
}
