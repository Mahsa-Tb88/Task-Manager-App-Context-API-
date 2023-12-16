import { useEffect, useState } from "react";
import AddTask from "./Componens/AddTask/AddTask";
import Filter from "./Componens/Filter/Filter";
import Pagination from "./Componens/Pagination/Pagination";
import Tasklist from "./Componens/Tasklist/Tasklist";
import {
  getAllTasks,
  getTasks,
  saveTasks,
  addTask,
  updateTask,
  deleteTask,
} from "./utils/storage";

export default function App() {
  const initialTasks = getTasks(1, 3);
  const perPage = 3;
  const [tasks, setTasks] = useState(initialTasks.tasks);
  const [totalTasks, setTotalTasks] = useState(initialTasks.totalTasks);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("all");
  const [search, setSearch] = useState("");
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);
  const [idEdit, setIdEdit] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  const totalPage = Math.ceil(
    getTasks(page, perPage, search, status).totalTasks.filterd / perPage
  );
  function handlePage(i) {
    setPage(i);
    const newTasks = getTasks(i, perPage, search, status);
    setTasks(newTasks.tasks);
    setTotalTasks(newTasks.totalTasks);
  }

  function handleAddTask(e) {
    e.preventDefault();
    if (!title) {
      return;
    }
    addTask(title, completed);
    const lastPage =
      getAllTasks().length > totalPage * perPage ? totalPage + 1 : totalPage;
    // const lastPage = Math.ceil((totalTasks.all + 1) / perPage);
    // console.log(lastNumberOfPage);
    setPage(lastPage);
    const allTasks = getTasks(lastPage, perPage);
    setTasks(allTasks.tasks);
    setTotalTasks(allTasks.totalTasks);
    setTitle("");
    setCompleted(false);
    setSearch("");
    setStatus("all");
  }

  function handleChangeStatus(newStatus) {
    setPage(1);
    setStatus(newStatus);
    const newTasks = getTasks(1, perPage, search, newStatus);
    setTasks(newTasks.tasks);
    setTotalTasks(newTasks.totalTasks);
  }
  function handleChangeSearch(e) {
    setSearch(e.target.value);
    const newSearch = e.target.value;
    setPage(1);
    const newTasks = getTasks(1, perPage, newSearch, status);
    setTasks(newTasks.tasks);
    setTotalTasks(newTasks.totalTasks);
  }
  function handleToggleTask(id) {
    const findTask = tasks.find((task) => task.id == id);
    const title = findTask.title;
    const completed = !findTask.completed;
    updateTask(id, title, completed);

    const newTasks = tasks.map((task) => {
      if (task.id == id) {
        task.completed = !task.completed;
        return { id, title: task.title, completed: task.completed };
      } else {
        return task;
      }
    });
    setTasks(newTasks);
  }
  function handleEditTask(id) {
    const findTask = tasks.find((task) => task.id == id);
    setIdEdit(id);
    setEditTitle(findTask.title);
    if (idEdit == id) {
      const newTasks = tasks.map((task) => {
        if (task.id == id) {
          return { id, title: editTitle, completed: task.completed };
        } else {
          return task;
        }
      });
      setTasks(newTasks);
      setIdEdit(null);
      updateTask(id, editTitle, findTask.completed);
    }
  }
  function handleDeleteTask(id) {
    const newTasks = tasks.filter((task) => task.id !== id);
    deleteTask(id);

    let allTasks;

    if (newTasks.length == 0 && page != 1) {
      allTasks = getTasks(page - 1, perPage, search, status);
      setPage(page - 1);
    } else {
      allTasks = getTasks(page, perPage, search, status);
    }
    setTasks(allTasks.tasks);

    setTotalTasks(allTasks.totalTasks);
  }

  return (
    <div className="container">
      <h1 className="text-center my-4">Text Manager App</h1>
      <AddTask
        title={title}
        handleAddTask={handleAddTask}
        setTitle={setTitle}
        setCompleted={setCompleted}
        completed={completed}
      />
      <Filter
        changeStatus={handleChangeStatus}
        changeSearch={handleChangeSearch}
        currentStatus={status}
        search={search}
      />
      <Tasklist
        tasks={tasks}
        onToggle={handleToggleTask}
        onEdit={handleEditTask}
        idEdit={idEdit}
        setEditTitle={setEditTitle}
        editTitle={editTitle}
        onDelete={handleDeleteTask}
        page
      />
      <Pagination
        currentPage={page}
        totalPage={totalPage}
        handlePgae={handlePage}
        tasks={tasks}
        page={page}
        setPage={setPage}
      />
    </div>
  );
}
