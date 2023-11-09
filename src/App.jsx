import { useReducer, useState } from "react";
import "./App.css";

const ActionTypes = {
  ADD_TASK: "ADD",
  DELETE_TASK: "DELETE",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.ADD_TASK:
      return [...state, { id: Date.now(), title: action.payload }];
    case ActionTypes.DELETE_TASK:
      return state.filter((task) => task.id !== action.payload);
    default:
      return state;
  }
};

function App() {
  const [task, setTask] = useState("");
  const [tasks, dispatch] = useReducer(reducer, []);

  const handleAddTask = () => {
    if (task.trim() !== "") {
      dispatch({ type: ActionTypes.ADD_TASK, payload: task });
      setTask(""); // Clear the input field after adding a task
    }
  };

  const handleDeleteTask = (taskId) => {
    dispatch({ type: ActionTypes.DELETE_TASK, payload: taskId });
  };

  return (
    <>
      <div className="card">
        <h1>useReducer Hook</h1>
        <input
          type="text"
          placeholder="Enter Task"
          className="task-input"
          value={task}
          onChange={(e) => {
            e.preventDefault();
            setTask(e.target.value);
          }}
        />
        <div className="card">
          <button onClick={handleAddTask}>Add Task</button>
        </div>
        <div className="card">
          {tasks &&
            tasks.map((task) => (
              <div key={task.id} className="task">
                <div>{task.title}</div>
                <button onClick={() => handleDeleteTask(task.id)}>
                  Delete
                </button>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default App;
