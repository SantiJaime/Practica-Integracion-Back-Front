import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";

const CrearTarea = () => {

    const [newTask, setNewTask] = useState("")

    const handleChange = (ev) => {
        const { value } = ev.target

        setNewTask(value)
    }

    const createTask = async () => {
      if(newTask){
        await fetch("http://localhost:1611/ej1", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nombre: newTask
            })
          });
      }
      else{
        Swal.fire({
          icon: "error",
          title: "Campo nombre vacío",
          text: "Rellene el campo del formulario",
        });
      }
    }

  return (
    <Form className="my-3 p-3 bg-danger-subtle rounded-3">
      <Form.Group className="mb-3" controlId="taskNameId">
        <Form.Label>Nombre de la tarea</Form.Label>
        <Form.Control type="text" onChange={handleChange}/>
      </Form.Group>
      <Form.Group>
        <Button variant="outline-danger" onClick={createTask}>Subir tarea</Button>
      </Form.Group>
    </Form>
  );
};

export default CrearTarea;
