import React, { useState, useEffect } from "react";

function TaskForm({ onSave, task }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || "");
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    const taskData = { title, description };
    if (task) onSave(task._id, taskData);
    else onSave(taskData);
    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
        required
      />
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task description"
      />
      <button type="submit">{task ? "Update" : "Add"} Task</button>
    </form>
  );
}

export default TaskForm;
