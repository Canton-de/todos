import React from 'react';
import PropTypes from 'prop-types';

const NewTaskForm = ({ addTask, curValue, changeTaskInput }) => (
  <form onSubmit={addTask}>
    <h1>todos</h1>
    <input value={curValue} className="new-todo" placeholder="What needs to be done?" onChange={changeTaskInput} />
  </form>
);

NewTaskForm.propTypes = {
  addTask: PropTypes.func.isRequired,
  changeTaskInput: PropTypes.func.isRequired,
  curValue: PropTypes.string.isRequired,
};
export default NewTaskForm;
