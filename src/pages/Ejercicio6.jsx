import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import CrearReceta from "../components/CrearReceta";
import ModificarReceta from "../components/ModificarReceta";
import Swal from "sweetalert2";

const Ejercicio6 = () => {
  const navigate = useNavigate();

  const token = JSON.parse(localStorage.getItem("token")) || "";

  const [recipes, setRecipes] = useState([]);

  const getAllRecipes = async () => {
    const res = await fetch("http://localhost:1611/ej5/recipes");
    const data = await res.json();

    setRecipes(data.allRecipes);
  };

  useEffect(() => {
    getAllRecipes();
  }, []);

  const logOut = () => {
    localStorage.removeItem("token");

    navigate("/ej6");
  };

  const deleteRecipe = async (id) => {
    const res = await fetch(`http://localhost:1611/ej5/recipes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    if (res.status === 200) {
      Swal.fire({
        icon: "success",
        title: "Receta eliminada con éxito",
        timer: 1500,
        showConfirmButton: false,
      });
      setRecipes((prevRecipes) =>
        prevRecipes.filter((receta) => receta._id !== id)
      );
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo eliminar la receta",
      });
    }
  };

  return (
    <Container>
      <h1 className="text-center mt-5">Blog de Recetas</h1>
      <hr />
      <p className="text-center">
        ¡Bienvenido a nuestro blog de recetas! Aquí podrás crear tus recetas y
        mostrarlas a otros usuarios.
      </p>
      {token ? (
        <div className="d-flex justify-content-center">
          <CrearReceta />
          <Button variant="outline-danger" className="mx-1" onClick={logOut}>
            Cerrar sesión
          </Button>
        </div>
      ) : (
        <div className="d-flex justify-content-center">
          <Link className="btn btn-outline-primary mx-1" to={"/ej6/register"}>
            Registrarse
          </Link>
          <Link className="btn btn-outline-success mx-1" to={"/ej6/login"}>
            Iniciar sesión
          </Link>
        </div>
      )}
      <hr />
      <h2 className="text-center mb-5">Recetas publicadas</h2>
      <Row>
        {recipes.map((receta) => (
          <Col key={receta._id} lg={3} md={6} sm={12}>
            <Card>
              <Card.Img variant="top" src={receta.img} />
              <Card.Body>
                <Card.Title>{receta.nombre}</Card.Title>
                <Card.Text>{receta.descripcion}</Card.Text>
                {token ? (
                  <div className="d-flex justify-content-around">
                    <ModificarReceta
                      id={receta._id}
                      receta={receta}
                      setRecipes={setRecipes}
                    />
                    <Button
                      variant="danger"
                      onClick={() => deleteRecipe(receta._id)}
                    >
                      Eliminar
                    </Button>
                  </div>
                ) : (
                  ""
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Ejercicio6;
