const db = require('../db/connection');

exports.getTodos = (req, res) => {
    db.query('SELECT * FROM todos', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.createTodo = (req, res) => {
    const { title } = req.body;
    if (!title) return res.status(400).json({ error: 'Le titre est requis' });

    db.query('INSERT INTO todos (title, completed) VALUES (?, ?)', [title, false], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: result.insertId, title, completed: false });
    });
};
