import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskCard from "../components/TaskCard";
import TaskModal from "../components/TaskModal";
import { Button } from "react-bootstrap";
import Swal from 'sweetalert2';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/tasks`);
            
            setTasks(data);
        } catch (err) {
            console.error("API Fetch Error:", err);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Failed to fetch tasks from the server.',
                timer: 4000,
                timerProgressBar: true,
                showConfirmButton: false,
                toast: true,
                position: 'top-end',
            });
        }
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between mb-3">
                <h2>My Tasks</h2>
                <Button variant="light" onClick={() => { setSelectedTaskId(null); setShowModal(true); }}>
                    ➕
                </Button>
            </div>

            {tasks.length === 0 ? <p>No tasks found.</p> : tasks.map((task) => (
                <TaskCard
                    key={task.id}
                    task={task}
                    setTasks={setTasks}
                    tasks={tasks}
                    setShowModal={setShowModal}
                    setSelectedTaskId={setSelectedTaskId}
                />
            ))}

            {/* Task Modal */}
            <TaskModal
                show={showModal}
                onHide={() => setShowModal(false)}
                id={selectedTaskId}
                tasks={tasks}
                setTasks={setTasks}
            />
        </div>
    );
};

export default TaskList;
