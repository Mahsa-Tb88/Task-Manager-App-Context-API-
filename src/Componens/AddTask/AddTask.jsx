import { useRef, useState } from "react";
import "./AddTask.scss";
import { getAllTasks, getTasks, saveTasks } from "../../utils/storage";
export default function AddTask({
  title,
  setTitle,
  handleAddTask,
  completed,
  setCompleted,
}) {
  return (
    <div>
      <form className="add-task-form" onSubmit={handleAddTask}>
        <div className="input-group input-group-lg">
          <input
            type="text"
            placeholder="Add a New Task..."
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            Add Task
          </button>
        </div>
        <div className="mt-2 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="completed-check"
            onChange={(e) => setCompleted(e.target.checked)}
            checked={completed}
          />
          <label className="form-check-label" htmlFor="completed-check">
            Is Completed?
          </label>
        </div>
      </form>
    </div>
  );
}
