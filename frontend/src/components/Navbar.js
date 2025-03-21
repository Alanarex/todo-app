import React from "react";
import { Navbar as BootstrapNavbar, Container } from "react-bootstrap";
import "../styles/global.css";

const Navbar = ({ onAddTask }) => {
    return (
        <BootstrapNavbar className="navbar">
            <Container className="d-flex justify-content-between align-items-center">
                <span className="navbar-title">Task Manager</span>
                <button className="add-task-btn" onClick={onAddTask}>+</button>
            </Container>
        </BootstrapNavbar>
    );
};

export default Navbar;
