import PropTypes from 'prop-types';
import React from 'react';

const Task = ({ task, onStopTimer, changeStatus, destroyTask, onEdited, onEditTask, startTimer }) => {
  const { description, stringDate, status, timer } = task;
  return (
    <li className={status}>
      <div className="view">
        <input onChange={changeStatus} type="checkbox" checked={status === 'completed'} className="toggle" />
        <label>
          <span className="title">{description}</span>
          <span className="description">
            <button type="button" label="icon-play" onClick={startTimer} className="icon icon-play" />
            <button type="button" label="icon-pause" onClick={onStopTimer} className="icon icon-pause" />
            <div style={{ display: 'inline-block', marginLeft: '15px' }}>{`${Math.floor(timer / 60)}:${
              timer % 60
            }`}</div>
          </span>
          <span style={{ display: 'inline-block', width: '43%' }} className="description">
            created {stringDate}
          </span>
        </label>
        <button type="button" onClick={onEditTask} label="icon-edit" className="icon icon-edit" />
        <button type="button" label="icon-destroy" onClick={destroyTask} className="icon icon-destroy" />
      </div>
      <input type="text" onKeyDown={onEdited} defaultValue={description} className="edit" />
    </li>
  );
};
Task.propTypes = {
  task: PropTypes.shape({
    timer: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    stringDate: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  changeStatus: PropTypes.func.isRequired,
  destroyTask: PropTypes.func.isRequired,
  onEdited: PropTypes.func.isRequired,
  onEditTask: PropTypes.func.isRequired,
  startTimer: PropTypes.func.isRequired,
  onStopTimer: PropTypes.func.isRequired,
};

export default Task;
