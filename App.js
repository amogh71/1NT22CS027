import React, { useState } from 'react';
import './App.css'; // Assuming you'll add some CSS for styling
import { Log } from './utils/logger'; // Import the Log function

// A simple component for displaying a to-do item
function TodoItem({ todo, onToggleComplete, onRemove }) {
  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <span onClick={() => onToggleComplete(todo.id)}>{todo.text}</span>
      <button onClick={() => onRemove(todo.id)}>Remove</button>
    </li>
  );
}

// The main component that manages the to-do list logic
function TodoList() {
  // State to hold the array of todos
  const [todos, setTodos] = useState([]);
  // State to hold the text for the new todo item
  const [newTodo, setNewTodo] = useState('');

  // Handle adding a new todo item
  const handleAddTodo = (e) => {
    e.preventDefault(); // Prevents the form from refreshing the page
    if (newTodo.trim() === '') {
        Log("warn", "component", "Attempted to add an empty to-do.");
        return; // Don't add empty todos
    }

    const newTodoItem = {
      id: Date.now(), // Unique ID for the item
      text: newTodo,
      completed: false,
    };

    setTodos([...todos, newTodoItem]); // Add the new item to the array
    setNewTodo(''); // Clear the input field
    Log("info", "component", `Added new todo: "${newTodoItem.text}"`); 
  };

  // Handle marking an item as complete or incomplete
  const handleToggleComplete = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
    const toggledTodo = todos.find(todo => todo.id === id);
    if (toggledTodo) {
        const newStatus = toggledTodo.completed ? 'incomplete' : 'complete';
        Log("info", "component", `Toggled todo "${toggledTodo.text}" to ${newStatus}`);
    }
  };

  // Handle removing a to-do item
  const handleRemoveTodo = (id) => {
    const removedTodo = todos.find(todo => todo.id === id);
    setTodos(todos.filter(todo => todo.id !== id));
    if (removedTodo) {
        Log("warn", "component", `Removed todo: "${removedTodo.text}"`);
    }
  };

  return (
    <div className="todo-list-container">
      <h2>My To-Do List</h2>
      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new task..."
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggleComplete={handleToggleComplete}
            onRemove={handleRemoveTodo}
          />
        ))}
      </ul>
    </div>
  );
}

function App() {
  Log("info", "page", "App component loaded successfully.");
  
  return (
    <div className="App">
      <TodoList />
    </div>
  );
}

export default App;