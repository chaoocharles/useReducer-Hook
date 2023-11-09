import { useReducer, useState } from "react";
import "./App.css";

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [...state, { id: Date.now(), title: action.payload }];
    case "DELETE":
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
      dispatch({ type: "ADD", payload: task });
      setTask(""); // Clear the input field after adding a task
    }
  };

  const handleDeleteTask = (taskId) => {
    dispatch({ type: "DELETE", payload: taskId });
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
