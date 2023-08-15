import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";

const ModificarReceta = ({ id, receta, setRecipes }) => {
  const token = JSON.parse(localStorage.getItem("token")) || "";

  const [show, setShow] = useState(false);
  const [formValues, setFormValues] = useState({
    nombre: "",
    descripcion: "",
    img: "",
  });
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (ev) => {
    const { name, value } = ev.target;

    setFormValues({ ...formValues, [name]: value });
  };

  const updateRecipe = async (id) => {
    if (!formValues.nombre) formValues.nombre = receta.nombre;
    if (!formValues.descripcion) formValues.descripcion = receta.descripcion;
    if (!formValues.img) formValues.img = receta.img;

    const res = await fetch(`http://localhost:1611/ej5/recipes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        nombre: formValues.nombre,
        descripcion: formValues.descripcion,
        img: formValues.img,
      }),
    });
    if (res.status === 200) {
      Swal.fire({
        icon: "success",
        title: "Receta modificada con éxito",
        timer: 1500,
        showConfirmButton: false,
      });
      setRecipes((prevRecipes) =>
        prevRecipes.map((receta) =>
          receta._id === id ? { ...receta, ...formValues } : receta
        )
      );
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo modificar la receta",
      });
    }
    setShow(false);
  };
  return (
    <>
      <Button variant="success" onClick={handleShow}>
        Editar
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edite su receta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="nameId">
              <Form.Label>Nombre de la receta</Form.Label>
              <Form.Control
                type="text"
                onChange={handleChange}
                name="nombre"
                placeholder={receta.nombre}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="descriptionId">
              <Form.Label>Descripción de la receta</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                onChange={handleChange}
                name="descripcion"
                placeholder={receta.descripcion}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="imgId">
              <Form.Label>URL de imagen de la receta (opcional)</Form.Label>
              <Form.Control
                type="text"
                onChange={handleChange}
                name="img"
                placeholder={receta.img}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => updateRecipe(id)}>
            Guardar cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModificarReceta;
