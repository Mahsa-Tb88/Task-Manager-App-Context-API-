import AddTask from "./Componens/AddTask/AddTask";
import Filter from "./Componens/Filter/Filter";
import Pagination from "./Componens/Pagination/Pagination";
import Tasklist from "./Componens/Tasklist/Tasklist";
import { useTaskContext } from "./Context/TasksContext";

export default function App() {
  console.log("yyy");

  const {
    handleChangeStatus,
    handleChangeSearch,
    status,
    search,
    page,
    setPage,
    totalPage,
    handlePage,
    tasks,
  } = useTaskContext();
  return (
    <div className="container">
      <h1 className="text-center my-4">Text Manager App</h1>
      <AddTask />
      <Filter
        changeStatus={handleChangeStatus}
        changeSearch={handleChangeSearch}
        currentStatus={status}
        search={search}
      />
      <Tasklist />
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
