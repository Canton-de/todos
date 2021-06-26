import React from 'react';
import PropTypes from 'prop-types';
import TasksFilter from '../tasks-filter/TasksFilter';

const Footer = ({ onFilter, selected, onClearCompleted, leftCount }) => (
  <footer className="footer">
    <span className="todo-count">{leftCount} items left</span>
    <TasksFilter onFilter={onFilter} selected={selected} />
    <button type="button" onClick={onClearCompleted} className="clear-completed">
      Clear completed
    </button>
  </footer>
);

Footer.propTypes = {
  onFilter: PropTypes.func.isRequired,
  selected: PropTypes.string.isRequired,
  onClearCompleted: PropTypes.func.isRequired,
  leftCount: PropTypes.number.isRequired,
};
export default Footer;
