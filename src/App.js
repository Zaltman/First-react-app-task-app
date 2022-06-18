import './App.css';
import Overview from './components/Overview';
import { Component } from 'react';
import uniqid from 'uniqid';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      task: {
        text: '',
        id: uniqid(),
        index: 1,
        isEdited: false,
      },
      editedTask: {
        text: '',
      },
      tasks: [],
    };
  }
  confirmEdit = (e) => {
    let targetTaskId = e.target.getAttribute('data-task-id');
    this.state.tasks.map((task, index, array) => {
      if (task.id === targetTaskId) {
        let editedArray = array;
        editedArray[index].text = this.state.editedTask.text;
        editedArray[index].isEdited = false;

        this.setState({
          tasks: editedArray,
        });
      }
    });
  };
  handleChange = (e) => {
    this.setState({
      task: {
        text: e.target.value,
        id: this.state.task.id,
        index: this.state.task.index,
        isEdited: false,
      },
    });
  };

  handleEditChange = (e) => {
    let inputValue = e.target.value;
    this.setState({
      editedTask: {
        text: inputValue,
      },
    });
  };

  onSubmitTask = (e) => {
    e.preventDefault();
    if (this.state.task.text === '') {
      return;
    }
    this.setState({
      tasks: this.state.tasks.concat(this.state.task),
      task: {
        text: '',
        id: uniqid(),
        index: this.state.task.index + 1,
        isEdited: false,
      },
    });
  };
  editTask = (e) => {
    let isAbleToContinue = true;
    this.state.tasks.map((task) => {
      if (task.isEdited === true) {
        isAbleToContinue = false;
      }
    });
    if (isAbleToContinue === false) {
      return alert('finish editing another task');
    }
    let taskId = e.target.getAttribute('data-task-id');
    this.state.tasks.map((task, index, array) => {
      if (task.id === taskId) {
        let editedArray = array;
        editedArray[index].isEdited = true;
        this.setState({ tasks: editedArray });
      }
    });
  };
  deleteTask = (e) => {
    let uniqid = e.target.getAttribute('data-task-id');
    let filteredArray = this.state.tasks.filter((task) => task.id !== uniqid);

    this.setState({
      tasks: filteredArray,
    });
  };

  render() {
    const { task, tasks } = this.state;

    return (
      <div>
        <form id="taskForm" onSubmit={this.onSubmitTask}>
          <label htmlFor="taskInput">Enter task</label>
          <input
            onChange={this.handleChange}
            value={task.text}
            type="text"
            id="taskInput"
          />

          <button type="submit">Add Task</button>
        </form>
        <Overview
          tasks={tasks}
          deleteTask={this.deleteTask}
          editTask={this.editTask}
          confirmEdit={this.confirmEdit}
          onEditChange={this.handleEditChange}
        />
      </div>
    );
  }
}
export default App;
