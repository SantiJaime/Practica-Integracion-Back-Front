import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const CrearReceta = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [formValues, setFormValues] = useState({
    nombre: "",
    descripcion: "",
    img: "",
  });

  const [checkInputName, setCheckInputName] = useState(false);
  const [checkInputDesc, setCheckInputDesc] = useState(false);

  const handleChange = (ev) => {
    const { name, value } = ev.target;

    setFormValues({ ...formValues, [name]: value });

    if (formValues.nombre) setCheckInputName(false);
    if (formValues.descripcion) setCheckInputDesc(false);
  };

  const createRecipe = async () => {
    console.log(token)
    if (formValues.nombre) {
      if (formValues.descripcion) {
        const res = await fetch("http://localhost:1611/ej5/recipes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            nombre: formValues.nombre,
            descripcion: formValues.descripcion,
            img: formValues.img,
          }),
        });
        setShow(false);
      } else setCheckInputDesc(true);
    } else setCheckInputName(true);
  };

  return (
    <>
      <Button variant="outline-info" className="mx-1" onClick={handleShow}>
        Crear receta
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="bg-body-secondary">
          <Modal.Title>Crea tu receta aquí</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-body-secondary">
          <Form>
            <Form.Group className="mb-3" controlId="nameId">
              <Form.Label>Nombre de la receta</Form.Label>
              <Form.Control
                type="text"
                onChange={handleChange}
                name="nombre"
                className={
                  checkInputName ? "form-control is-invalid" : "form-control"
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="descriptionId">
              <Form.Label>Descripción de la receta</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                onChange={handleChange}
                name="descripcion"
                className={
                  checkInputDesc ? "form-control is-invalid" : "form-control"
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="imgId">
              <Form.Label>URL de imagen de la receta (opcional)</Form.Label>
              <Form.Control type="text" onChange={handleChange} name="img" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="bg-body-secondary">
          <Button variant="outline-dark" onClick={createRecipe}>
            Guardar receta
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CrearReceta;
