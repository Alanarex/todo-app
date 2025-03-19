import React, { useState } from 'react';

function TodoForm({ addTodo }) {
    const [input, setInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        addTodo(input);
        setInput('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Nouvelle tâche" />
            <button type="submit">Ajouter</button>
        </form>
    );
}

export default TodoForm;
