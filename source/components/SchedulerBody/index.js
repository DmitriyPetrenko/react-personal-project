import React from 'react';

// Components
import AddTask from '../AddTask';
import TaskList from '../TaskList';

function SchedulerBody ({ variant }) {
    return (
        <section>
            <AddTask />
            <TaskList
                variant = { variant }
            />
        </section>
    );
}

export default SchedulerBody;
