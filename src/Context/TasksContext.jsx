import React, { createContext, useContext, useState } from "react";
import {
  getAllTasks,
  getTasks,
  addTask,
  updateTask,
  deleteTask,
} from "../utils/storage";
const TasksContext = React.createContext();
export default TasksContext;

function TasksContextProvider({ children }) {
  const initialTasks = getTasks(1, 3);
  const perPage = 3;
  const [tasks, setTasks] = useState(initialTasks.tasks);
  const [totalTasks, setTotalTasks] = useState(initialTasks.totalTasks);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("all");
  const [search, setSearch] = useState("");
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
  function handleAddTask(title, completed) {
    addTask(title, completed);
    const lastPage =
      getAllTasks().length > totalPage * perPage ? totalPage + 1 : totalPage;
    setPage(lastPage);
    const allTasks = getTasks(lastPage, perPage);
    setTasks(allTasks.tasks);
    setTotalTasks(allTasks.totalTasks);
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
  const context = {
    tasks,
    onToggle: handleToggleTask,
    onEdit: handleEditTask,
    idEdit,
    setEditTitle,
    editTitle,
    onDelete: handleDeleteTask,
    page,
    handleAddTask,
    handleChangeStatus,
    handleChangeSearch,
    status,
    search,
    setPage,
    totalPage,
    handlePage,
  };
  <TasksContext.Provider value={context}>{children}</TasksContext.Provider>;
}

function useTaskContext() {
  return useContext(TasksContext);
}

export { TasksContextProvider, useTaskContext };
