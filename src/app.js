import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskForm from "./Taskform";
import TaskList from "./Tasklist";

const API_URL = "http://localhost:5000/api/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async () => {
    const res = await axios.get(API_URL);
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const createTask = async (task) => {
    await axios.post(API_URL, task);
    fetchTasks();
  };

  const updateTask = async (id, updatedTask) => {
    await axios.put(`${API_URL}/${id}`, updatedTask);
    setEditingTask(null);
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchTasks();
  };

  return (
    <div className="container">
      <h1>Task Manager</h1>
      <TaskForm
        onSave={editingTask ? updateTask : createTask}
        task={editingTask}
      />
      <TaskList
        tasks={tasks}
        onEdit={setEditingTask}
        onDelete={deleteTask}
      />
    </div>
  );
}

export default App;
