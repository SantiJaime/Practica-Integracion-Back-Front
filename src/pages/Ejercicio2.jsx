import React, { useEffect, useState } from "react";
import CrearTarea from "../components/CrearTarea";
import { Button, Container } from "react-bootstrap";
import Swal from "sweetalert2";
import ModificarTarea from "../components/ModificarTarea";

const Ejercicio2 = () => {
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    const res = await fetch("http://localhost:1611/ej1/");
    const data = await res.json();
    setTasks(data.allTasks);
  };

  useEffect(() => {
    getTasks();
  }, []);

  const deleteTask = async (id) => {
    const res = await fetch(`http://localhost:1611/ej1/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status === 200) {
      Swal.fire({
        icon: "success",
        title: "Tarea eliminada con éxito",
        timer: 1500,
        showConfirmButton: false,
      });
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo eliminar la tarea",
      });
    }
  };

  return (
    <>
      <Container>
        <CrearTarea/>
        <hr />
        <section className="d-flex justify-content-center">
          <div className="p-3 bg-body-secondary rounded-3 w-50">
            {tasks?.map((task) => (
              <div
                key={task._id}
                className="d-flex justify-content-between border border-1 border-black rounded-3 p-1 my-2"
              >
                <h5 className="ms-3 mt-1">{task.nombre}</h5>
                <div>
                  <ModificarTarea taskId={task._id} taskName={task.nombre} setTasks={setTasks} fullTask={task}/>
                  <Button
                    variant="outline-danger"
                    className="rounded-5 mx-1"
                    onClick={() => deleteTask(task._id)}
                  >
                    <i className="bi bi-x-lg"></i>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </Container>
    </>
  );
};

export default Ejercicio2;
