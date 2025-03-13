"use client";

import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useRouter } from "next/navigation";

const AddTask = ({ employees }) => {
  const [show, setShow] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [empId, setEmpId] = useState();

  const router = useRouter();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/task", {
        taskName: taskName,
        dueDate: new Date(dueDate).toISOString(), // Convert to ISO string
        employeeId: Number(empId),
      });
      console.log();

      router.refresh();
      setTaskName("");
      setDueDate("");
      setEmpId();
      setShow(false);
    } catch (error) {
      console.error("Error posting task:", error);
      setShow(false);
    }
  };

  return (
    <div className="text-center mb-6">
      <Button variant="primary" onClick={handleShow}>
        Add New Task
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Task Name</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                required
                onChange={(e) => setTaskName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type="date"
                required
                onChange={(e) => setDueDate(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Assign to</Form.Label>
              <Form.Select
                aria-label="Default select example"
                required
                onChange={(e) => setEmpId(e.target.value)}
              >
                <option>Select employee</option>
                {employees.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <div className="mt-8 flex gap-2 justify-right">
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddTask;
