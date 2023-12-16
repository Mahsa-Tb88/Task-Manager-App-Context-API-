import Task from "../Task/Task";
import "./Tasklist.scss";

export default function Tasklist({
  tasks,
  onToggle,
  onEdit,
  idEdit,
  setEditTitle,
  editTitle,
  onDelete,
  page,
}) {
  if (tasks.length == 0 && page == 1) {
    return <p className="notask">There is no task</p>;
  }
  return (
    <ul className="list-group tasks-list">
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
          idEdit={idEdit}
          setEditTitle={setEditTitle}
          editTitle={editTitle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
