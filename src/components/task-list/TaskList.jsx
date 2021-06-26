import React from 'react';
import PropTypes from 'prop-types';
import Task from '../task/Task';

const TaskList = ({ tasks, destroyTask, startTimer, onStopTimer, changeStatus, onEdited, onEditTask }) => (
  <ul className="todo-list">
    {tasks.map((task) => {
      const { id, timerId, ...restTask } = task;
      const onStartTimer = () => {
        if (timerId) {
          return () => {};
        }
        return () => setTimeout(startTimer(id), 1000);
      };
      return (
        <Task
          onStopTimer={() => onStopTimer(id)}
          startTimer={onStartTimer()}
          onEditTask={() => onEditTask(id)}
          changeStatus={() => changeStatus(id)}
          task={restTask}
          onEdited={(event) => onEdited(event, id)}
          destroyTask={() => destroyTask(id)}
          key={id}
        />
      );
    })}
  </ul>
);

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  destroyTask: PropTypes.func.isRequired,
  changeStatus: PropTypes.func.isRequired,
  onEdited: PropTypes.func.isRequired,
  onEditTask: PropTypes.func.isRequired,
  startTimer: PropTypes.func.isRequired,
  onStopTimer: PropTypes.func.isRequired,
};
export default TaskList;
