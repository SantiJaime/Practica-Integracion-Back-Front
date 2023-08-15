import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Swal from "sweetalert2";
import CrearColor from "../components/CrearColor";
import ModificarColor from "../components/ModificarColor";

const Ejercicio4 = () => {
  const [colors, setColors] = useState([]);

  const getAllColors = async () => {
    const res = await fetch("http://localhost:1611/ej3");
    const data = await res.json();

    setColors(data.allColors);
  };

  useEffect(() => {
    getAllColors();
  }, []);

  const deleteColor = async (id) => {
    const res = await fetch(`http://localhost:1611/ej3/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status === 200) {
      Swal.fire({
        icon: "success",
        title: "Color eliminado con éxito",
        timer: 1500,
        showConfirmButton: false,
      });
      setColors((prevColors) => prevColors.filter((color) => color._id !== id));
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo eliminar el color",
      });
    }
  };

  return (
    <Container>
      <CrearColor colors={colors}/>
      <hr />
      <Row>
        {colors.map((color) => (
          <Col key={color.cod} lg={3} md={6} sm={12} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title>{color.nombre}</Card.Title>
                <Card.Text>
                  <li>Código único: {color.cod}</li>
                  <li>Código HEX: {color.codHex}</li>
                  <li>Código RGB: {color.codRGB}</li>
                </Card.Text>
                <div className="d-flex justify-content-around">
                  <ModificarColor nombreColor={color.nombre} codHexColor={color.codHex} codRgbColor={color.codRGB} idColor={color._id} setColors={setColors} />
                  <Button variant="danger" onClick={() => deleteColor(color._id)}>Eliminar</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Ejercicio4;
