import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";

const ModificarColor = ({ nombreColor, codHexColor, codRgbColor, idColor, setColors }) => {
  const [show, setShow] = useState(false);
  const [modColor, setModColor] = useState({
    nombre: "",
    codHex: "",
    codRGB: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const updateColor = (ev) => {
    const { name, value } = ev.target;

    setModColor({ ...modColor, [name]: value });
  };
  const saveChanges = async (id) => {
    if (!modColor.codHex) modColor.codHex = "No asignado";
    if (!modColor.codRGB) modColor.codRGB = "No asignado";

    if (modColor.nombre) {
      const res = await fetch(`http://localhost:1611/ej3/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: modColor.nombre,
          codHex: modColor.codHex,
          codRGB: modColor.codRGB,
        }),
      });
      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Color modificado con éxito",
          timer: 1500,
          showConfirmButton: false,
        });
        setColors((prevColors) =>
          prevColors.map((color) =>
            color._id === id ? { ...color, ...modColor } : color
          )
        );
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo modificar el color",
        });
      }
      setShow(false);
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
      <Button onClick={handleShow}>Editar</Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modifique el color seleccionado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="nameId">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder={nombreColor}
                name="nombre"
                onChange={updateColor}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="hexId">
              <Form.Label>Código HEX</Form.Label>
              <Form.Control
                type="text"
                placeholder={codHexColor}
                name="codHex"
                onChange={updateColor}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="rgbId">
              <Form.Label>Código RGB</Form.Label>
              <Form.Control
                type="text"
                placeholder={codRgbColor}
                name="codRGB"
                onChange={updateColor}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => saveChanges(idColor)}>
            Guardar cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModificarColor;
