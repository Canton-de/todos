import React from 'react';
import '../App.css';
import { formatDistanceToNow } from 'date-fns';
import Footer from './footer/Footer';
import NewTaskForm from './new-task-form/NewTaskForm';
import TaskList from './task-list/TaskList';

class App extends React.Component {
  maxId = 5;

  state = {
    tasks: [this.createTask('sa')],
    taskInput: '',
    filterValue: 'all',
  };

  componentDidMount() {
    this.setStringDate();
  }

  componentWillUnmount() {
    const { tasks } = this.state;
    tasks.forEach((task) => clearInterval(task.timerId));
  }

  changeStatus = (id) => {
    this.setState(({ tasks }) => ({
      tasks: tasks.map((task) => (task.id !== id ? task : { ...task, status: task.status === '' ? 'completed' : '' })),
    }));
  };

  destroyTask = (id) => {
    this.onStopTimer(id);
    this.setState(({ tasks }) => ({ tasks: tasks.filter((task) => task.id !== id) }));
  };

  leftCount = () => {
    const { tasks } = this.state;
    return tasks.reduce((acc, task) => (task.status !== 'completed' ? acc + 1 : acc), 0);
  };

  onFilter = (filterName) => {
    this.setState({ filterValue: filterName });
  };

  onClearCompleted = () => {
    this.setState(({ tasks }) => ({ tasks: tasks.filter((task) => task.status !== 'completed') }));
  };

  changeTaskInput = (event) => {
    this.setState({ taskInput: event.target.value });
  };

  onEdited = (event, id) => {
    if (event.key === 'Enter') {
      this.setState(({ tasks }) => ({
        tasks: tasks.map((task) => (task.id !== id ? task : { ...task, status: '', description: event.target.value })),
      }));
    }
  };

  onEditTask = (id) => {
    this.setState(({ tasks }) => ({
      tasks: tasks.map((task) => (task.id !== id ? task : { ...task, status: 'editing' })),
    }));
  };

  filter = (tasks) => {
    const { filterValue } = this.state;
    switch (filterValue) {
      case 'active':
        return tasks.filter((task) => task.status === '');
      case 'completed':
        return tasks.filter((task) => task.status === 'completed');
      case 'all':
        return tasks;
      default:
        return tasks;
    }
  };

  addTask = (description) => {
    this.setState(({ tasks }) => ({
      tasks: [...tasks, this.createTask(description)],
      taskInput: '',
    }));
  };

  setStringDate = () => {
    this.setState(({ tasks }) => ({
      tasks: tasks.map((task) => ({
        ...task,
        stringDate: formatDistanceToNow(task.whenCreated, { includeSeconds: true }),
      })),
    }));
    setTimeout(this.setStringDate, 1000);
  };

  onAddTask = (event) => {
    const { taskInput } = this.state;
    event.preventDefault();
    this.addTask(taskInput);
  };

  startTimer = (id) => {
    const timerId = setTimeout(() => {
      this.startTimer(id);
    }, 1000);

    this.setState(({ tasks }) => ({
      tasks: tasks.map((task) => (task.id !== id ? task : { ...task, timer: task.timer + 1, timerId })),
    }));
  };

  onStopTimer = (id) => {
    const { tasks: fTasks } = this.state;
    const foundTask = fTasks.find((task) => task.id === id);
    this.setState(({ tasks }) => ({
      tasks: tasks.map((task) => (task.id !== id ? task : { ...task, timerId: null })),
    }));
    clearInterval(foundTask.timerId);
  };

  createTask(description) {
    this.maxId += 1;
    return {
      description,
      whenCreated: new Date(),
      id: this.maxId,
      stringDate: formatDistanceToNow(new Date(), { includeSeconds: true }),
      status: '',
      timer: 0,
      timerId: null,
    };
  }

  render() {
    const { tasks, taskInput, filterValue } = this.state;
    return (
      <section className="todoapp">
        <NewTaskForm curValue={taskInput} addTask={this.onAddTask} changeTaskInput={this.changeTaskInput} />
        <TaskList
          tasks={this.filter(tasks)}
          onEdited={this.onEdited}
          destroyTask={this.destroyTask}
          changeStatus={this.changeStatus}
          onEditTask={this.onEditTask}
          startTimer={this.startTimer}
          onStopTimer={this.onStopTimer}
        />
        <Footer
          leftCount={this.leftCount()}
          onFilter={this.onFilter}
          onClearCompleted={this.onClearCompleted}
          selected={filterValue}
        />
      </section>
    );
  }
}

export default App;
