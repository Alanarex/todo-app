import React, { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { PencilSquare, Trash } from "react-bootstrap-icons";
import axios from "axios";
import Swal from "sweetalert2";

const TaskCard = ({ task, setTasks, tasks, setShowModal, setSelectedTaskId }) => {
  const [isCompleted, setIsCompleted] = useState(task.status);

  const formatDate = (dateString) => {
    if (!dateString) return "No due date";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const calculateDueStatus = () => {
    const today = new Date();
    const dueDate = task.due_time ? new Date(task.due_time) : null;
    const createdDate = new Date(task.created_at);

    if (!dueDate) {
      return `Created on ${formatDate(createdDate)}`;
    }

    const diffTime = dueDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return <span className="text-danger fw-bold">⏳ {Math.abs(diffDays)} days late</span>;
    }

    return `📅 ${diffDays} days left`;
  };

  const toggleCompletion = async () => {
    try {
      const { data } = await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/tasks/${task.id}/toggle`);
      setIsCompleted(data.status);
      setTasks(tasks.map((t) => (t.id === task.id ? { ...t, status: data.status } : t)));
    } catch (err) {
      console.error("Error toggling task status:", err);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error toggling task status.',
        timer: 4000,
        timerProgressBar: true,
        showConfirmButton: false,
        toast: true,
        position: 'top-end',
      });
    }
  };

  const handleEdit = () => {
    setSelectedTaskId(task.id);
    setShowModal(true);
  };

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to undo this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/tasks/${task.id}`);
        setTasks(tasks.filter((t) => t.id !== task.id));
        Swal.fire("Deleted!", "Your task has been deleted.", "success");
      } catch (err) {
        console.error("Error deleting task:", err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error deleting task.',
          timer: 4000,
          timerProgressBar: true,
          showConfirmButton: false,
          toast: true,
          position: 'top-end',
        });
      }
    }
  };

  return (
    <Card className="mb-3 shadow-sm p-3">
      <Card.Body className="d-flex justify-content-between align-items-center">
        <div>
          <Card.Title className="fw-bold fs-4">{task.title}</Card.Title>
          <Card.Text className="text-muted small">{calculateDueStatus()}</Card.Text>
          {task.description && <Card.Text className="fs-6">{task.description || ""}</Card.Text>}
        </div>

        <div className="text-end">
          <Form.Check
            type="checkbox"
            label="Done"
            checked={isCompleted}
            onChange={toggleCompletion}
            className="mb-2"
          />
          <Button variant="outline-primary" size="sm" className="me-2" onClick={handleEdit}>
            <PencilSquare />
          </Button>
          <Button variant="outline-danger" size="sm" onClick={handleDelete}>
            <Trash />
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default TaskCard;
