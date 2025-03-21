import React, { useState, useEffect, useMemo } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

const TaskModal = ({ show, onHide, id = null, tasks, setTasks }) => {
    const defaultTaskModel = useMemo(() => ({
        title: "",
        description: "",
        due_time: "",
    }), []);

    const [formData, setFormData] = useState(defaultTaskModel);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchTask = async () => {
            if (id) {
                try {
                    const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/tasks/${id}`);
                    if (data.due_time) {
                        data.due_time = new Date(data.due_time).toISOString().slice(0, 16);
                    }
                    setFormData({
                        title: data.title || "",
                        description: data.description || "",
                        due_time: data.due_time || "",
                    });
                } catch (err) {
                    console.error("Error fetching task data:", err);
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Failed to fetch task data.',
                        timer: 4000,
                        timerProgressBar: true,
                        showConfirmButton: false,
                        toast: true,
                        position: 'top-end',
                    });
                    setError("Failed to fetch task data.");
                }
            } else {
                setFormData(defaultTaskModel);
            }
        };

        if (show) {
            fetchTask();
        }
    }, [id, show, defaultTaskModel]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        setError("");
        if (!formData.title.trim()) {
            setError("Title is required.");
            return;
        }

        setLoading(true);
        try {
            if (id) {
                await axios.put(`${process.env.REACT_APP_BACKEND_URL}/tasks/${id}`, formData);
                setTasks(tasks.map((t) => (t.id === id ? { ...t, ...formData } : t)));
            } else {
                const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/tasks`, formData);
                setTasks([...tasks, data]); // Add new task to state
            }

            onHide();
        } catch (err) {
            console.error("Error saving task:", err);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Failed to save task.',
                timer: 4000,
                timerProgressBar: true,
                showConfirmButton: false,
                toast: true,
                position: 'top-end',
            });
            setError("Failed to save task.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{id ? "Edit Task" : "Add Task"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <p className="text-danger">{error}</p>}
                <Form onSubmit={(e) => e.preventDefault()}>
                    <Form.Group className="mb-3">
                        <Form.Label>Title *</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Due Date</Form.Label>
                        <Form.Control
                            type="datetime-local"
                            name="due_time"
                            value={formData.due_time}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSave} disabled={loading}>
                    {loading ? "Saving..." : "Save Task"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default TaskModal;
