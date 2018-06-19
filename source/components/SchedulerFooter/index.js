import React, { Component } from 'react';
import { string, func } from 'prop-types';

// Components
import Checkbox from '../../theme/assets/Checkbox';

class SchedulerFooter extends Component {
    shouldComponentUpdate (nextProps) {
        if (this.props.allCompleted !== nextProps.allCompleted) {
            return true;
        }

        return false;
    }

    onClick = () => {
        this.props.handleCompletedTasks();
    }

    render () {
        const { allCompleted, className } = this.props;

        return (
            <footer>
                <div>
                    <Checkbox
                        checked = { allCompleted }
                        color1 = '#000'
                        color2 = '#fff'
                        onClick = { this.onClick }
                    />
                </div>
                <span className = { className }>Все задачи выполнены</span>
            </footer>
        );
    }
}

SchedulerFooter.propTypes = {
    allCompleted:         string,
    handleCompletedTasks: func,
};

export default SchedulerFooter;
