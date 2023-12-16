import "./Filter.scss";
export default function Filter({ changeStatus, changeSearch, currentStatus,search }) {
  return (
    <div className="filter flex-column flex-md-row align-items-md-center ">
      <div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="status"
            id="all-tasks"
            onChange={() => changeStatus("all")}
            checked={currentStatus == "all"}
          />
          <label className="form-check-label" htmlFor="all-tasks">
            All Tasks
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="status"
            id="completed-task"
            value="completed"
            onChange={() => changeStatus("completed")}
            checked={currentStatus == "completed"}
          />
          <label className="form-check-label" htmlFor="completed-task">
            completed
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="status"
            id="in-progress-task"
            onChange={() => changeStatus("in-progress")}
            checked={currentStatus == "in-progress"}
          />
          <label className="form-check-label" htmlFor="in-progress-task">
            In progress
          </label>
        </div>
      </div>
      <div>
        <input
          type="text"
          placeholder="serach..."
          className="form-control"
          onChange={changeSearch}
          value={search}
        />
      </div>
    </div>
  );
}
