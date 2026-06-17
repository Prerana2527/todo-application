import React, { useState } from 'react';
import './App.css';

function App() {
  return (
    <div className="app">
      <h1>Todo Application (Date-wise)</h1>
      <Todo />
    </div>
  );
}

function Todo() {
  const [todo, setTodo] = useState("");
  const [date, setDate] = useState("");
  const [todos, setTodos] = useState([]);

  const handleSubmit = () => {
    if (todo.trim() === "" || date === "") return;

    const newTask = {
      text: todo,
      date: date
    };

    setTodos([...todos, newTask]);
    setTodo("");
    setDate("");
  };

  // Group tasks by date
  const groupedTasks = todos.reduce((acc, task) => {
    acc[task.date] = acc[task.date] || [];
    acc[task.date].push(task);
    return acc;
  }, {});

  return (
    <div className="todo-container">
      <div className="input-section">
        <input
          type="text"
          placeholder="Enter your task..."
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button onClick={handleSubmit}>Add</button>
      </div>

      {/* Display date-wise tasks */}
      {Object.keys(groupedTasks).map((d, index) => (
        <div key={index} className="date-group">
          <h3>{d}</h3>
          <ul>
            {groupedTasks[d].map((item, i) => (
              <li key={i}>{item.text}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default App;