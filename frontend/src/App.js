import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';

function App() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/todos')
            .then(response => setTodos(response.data))
            .catch(error => console.error('Erreur de chargement des tâches:', error));
    }, []);

    const addTodo = (title) => {
        axios.post('http://localhost:5000/todos', { title })
            .then(response => setTodos([...todos, response.data]))
            .catch(error => console.error('Erreur lors de l\'ajout:', error));
    };

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h1>To-Do List</h1>
            <TodoForm addTodo={addTodo} />
            <TodoList todos={todos} />
        </div>
    );
}

export default App;
