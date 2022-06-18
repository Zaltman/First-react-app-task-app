import React from 'react';

const Overview = (props) => {
  const { tasks, deleteTask, editTask, confirmEdit, onEditChange } = props;

  let isEditedRenderTask = (task) => {
    let element;
    if (task.isEdited === true) {
      element = (
        <input
          className="taskText"
          defaultValue={task.text}
          onChange={onEditChange}
        ></input>
      );
    } else {
      element = <div className="taskText">{task.text}</div>;
    }
    return element;
  };
  let isEditedRenderEditBtn = (task) => {
    let element;
    if (task.isEdited === true) {
      element = (
        <button
          className="editBtn"
          onClick={confirmEdit}
          data-task-id={task.id}
        >
          Confirm
        </button>
      );
    } else {
      element = (
        <button className="editBtn" onClick={editTask} data-task-id={task.id}>
          Edit
        </button>
      );
    }
    return element;
  };

  return (
    <ul id="taskList">
      {tasks.map((task) => {
        return (
          <li key={task.id}>
            <div className="taskIndex">{task.index}</div>
            {isEditedRenderTask(task)}
            <div className="btnContainer">
              {isEditedRenderEditBtn(task)}
              <button
                className="deleteBtn"
                onClick={deleteTask}
                data-task-id={task.id}
              >
                Delete
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default Overview;
