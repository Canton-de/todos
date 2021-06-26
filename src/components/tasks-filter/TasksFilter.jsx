import React from 'react';
import PropTypes from 'prop-types';

const TasksFilter = ({ onFilter, selected }) => {
  const isSelected = (selectedName) => (selectedName === selected ? 'selected' : '');
  return (
    <ul className="filters">
      <li>
        <button type="button" onClick={() => onFilter('all')} className={isSelected('all') && 'selected'}>
          All
        </button>
      </li>
      <li>
        <button type="button" onClick={() => onFilter('active')} className={isSelected('active')}>
          Active
        </button>
      </li>
      <li>
        <button type="button" onClick={() => onFilter('completed')} className={isSelected('completed')}>
          Completed
        </button>
      </li>
    </ul>
  );
};

TasksFilter.propTypes = {
  onFilter: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
};

export default TasksFilter;
