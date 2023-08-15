import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";

const ModificarTarea = ({ taskId, taskName, setTasks }) => {
  const [show, setShow] = useState(false);
  const [nameTask, setNameTask] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const updateTask = (ev) => {
    const { value } = ev.target;

    setNameTask(value);
  };
  const saveChanges = async (id) => {
    if (nameTask) {
      const res = await fetch(`http://localhost:1611/ej1/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: nameTask,
        }),
      });
      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Tarea modificada con éxito",
          timer: 1500,
          showConfirmButton: false,
        });
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === id ? { ...task, nombre: nameTask } : task
          )
        );
        setShow(false);
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo modificar la tarea",
        });
        setShow(false);
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Campo nombre vacío",
        text: "Rellene el campo del formulario",
      });
    }
  };
  return (
    <>
      <Button
        variant="outline-primary"
        className="rounded-5 mx-1"
        onClick={handleShow}
      >
        <i className="bi bi-pencil-fill"></i>
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modifique su tarea</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="nameId">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder={taskName}
                onChange={updateTask}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => saveChanges(taskId)}>
            Guardar cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModificarTarea;
