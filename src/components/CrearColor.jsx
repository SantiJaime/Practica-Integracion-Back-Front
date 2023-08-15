import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";

const CrearColor = ({ colors }) => {
  const [newColor, setNewColor] = useState({
    nombre: "",
    cod: null,
    codHex: "",
    codRGB: "",
  });

  const handleChange = (ev) => {
    const { name, value } = ev.target;

    setNewColor({ ...newColor, [name]: value });
  };

  const createColor = async () => {
    let newCode = colors.length > 0 ? colors[colors.length - 1].cod + 1 : 100;
    newColor.cod = newCode;

    if (!newColor.codHex) newColor.codHex = "No asignado";
    if (!newColor.codRGB) newColor.codRGB = "No asignado";

    if (newColor.nombre) {
      await fetch("http://localhost:1611/ej3", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: newColor.nombre,
          cod: newColor.cod,
          codHex: newColor.codHex,
          codRGB: newColor.codRGB,
        }),
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Campo nombre vacío",
        text: "Rellene los campos del formulario",
      });
    }
  };
  return (
    <Form className="my-3 p-3 bg-primary-subtle rounded-3">
      <Form.Group className="mb-3" controlId="nameId">
        <Form.Label>Nombre del color</Form.Label>
        <Form.Control type="text" name="nombre" onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="hexId">
        <Form.Label>Código HEX del color (opcional)</Form.Label>
        <Form.Control type="text" name="codHex" onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="rgbId">
        <Form.Label>Código RGB del color (opcional)</Form.Label>
        <Form.Control type="text" name="codRGB" onChange={handleChange} />
      </Form.Group>
      <Form.Group>
        <Button variant="outline-primary" onClick={createColor}>
          Crear color
        </Button>
      </Form.Group>
    </Form>
  );
};

export default CrearColor;
