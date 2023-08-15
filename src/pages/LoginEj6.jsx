import React from "react";
import { useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const LoginEj6 = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    email: "",
    pass: "",
  });

  const [checkInputUser, setCheckInputUser] = useState(false);
  const [checkInputPass, setCheckInputPass] = useState(false);

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    setFormValues({ ...formValues, [name]: value });

    if (formValues.email) {
      setCheckInputUser(false);
    }
    if (formValues.pass) {
      setCheckInputPass(false);
    }
  };

  const handleClick = async () => {
    if (formValues.email) {
      if (formValues.pass) {
        const res = await fetch("http://localhost:1611/ej5/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formValues.email,
            pass: formValues.pass,
          }),
        });
        const data = await res.json();

        if (data?.token){
          localStorage.setItem("token", JSON.stringify(data.token)); 
          navigate("/ej6")
        } 
        else {
          Swal.fire({
            icon: "error",
            title: "Usuario y/o contraseña incorrectos",
            text: "Comprueba tus datos",
          });
        }
      } else setCheckInputPass(true);
    } else setCheckInputUser(true);
  };

  return (
    <Container className="mt-5">
      <div className="d-flex justify-content-center">
        <Form className="w-75 bg-success-subtle p-3 rounded-4">
          <Form.Group className="mb-3" controlId="emailId">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              onChange={handleChange}
              name="email"
              placeholder="name@example.com"
              className={
                checkInputUser ? "form-control is-invalid" : "form-control"
              }
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="passId">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              onChange={handleChange}
              name="pass"
              placeholder="*************"
              className={
                checkInputPass ? "form-control is-invalid" : "form-control"
              }
            />
          </Form.Group>
          <div className="text-end">
            <Button variant="success" onClick={handleClick}>
              Iniciar sesión
            </Button>
          </div>
        </Form>
      </div>
      <hr />
      <div className="text-center">
        <Link className="btn btn-outline-danger" to={"/ej6"}>
          Volver al inicio
        </Link>
      </div>
    </Container>
  );
};

export default LoginEj6;
