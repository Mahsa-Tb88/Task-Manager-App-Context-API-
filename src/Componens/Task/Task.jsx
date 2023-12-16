import { useState } from "react";
import "./Task.scss";

export default function Task({
  task,
  onEdit,
  onToggle,
  idEdit,
  setEditTitle,
  editTitle,
  onDelete
}) {
  const statusClasses = [
    "status",
    task.completed ? "bg-success" : "bg-secondary",
  ].join(" ");
  const toggleClasses = [
    "btn",
    task.completed ? "btn-secondary" : "btn-success",
  ].join(" ");
  function handleInput(e) {
    setEditTitle(e.target.value);
  }
  return (
    <li className="list-group-item d-flex flex-column flex-md-row task ">
      <div>
        <span className="title-box">{task.title}</span>
        <span className={statusClasses}>
          {task.completed ? "completed" : "in-Progress"}
        </span>
      </div>
      <div className="actions">
        {idEdit == task.id ? (
          <input
            type="text"
            className="inputEdit"
            value={editTitle}
            onChange={handleInput}
          />
        ) : (
          ""
        )}
        <button className={toggleClasses} onClick={() => onToggle(task.id)}>
          Toggle
        </button>
        <button
          className="btn btn-primary mx-2"
          onClick={() => onEdit(task.id)}
        >
          {idEdit == task.id ? "Update" : "Edit"}
        </button>
        <button className="btn btn-danger" onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </div>
    </li>
  );
}
