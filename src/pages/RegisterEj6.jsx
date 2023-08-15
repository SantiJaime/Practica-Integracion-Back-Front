import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const RegisterEj6 = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    email: "",
    pass: "",
    repeatPass: "",
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
      if (formValues.pass && formValues.pass.length >= 8) {
        if (formValues.pass === formValues.repeatPass) {
          const res = await fetch("http://localhost:1611/ej5/users", {
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
          console.log(data);
          if (data.status === 201) {
            Swal.fire({
              icon: "success",
              title: "Usuario registrado",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/ej6/login")
          }
          else if(data.status === 422){
            Swal.fire({
                icon: "error",
                title: "El Email ya se encuentra registrado",
                text: "Pruebe con otro email"
              });
          }
        } else {
          Swal.fire({
            icon: "error",
            title: "Las contraseñas no coinciden",
            text: "Comprueba tus contraseñas",
          });
        }
      } else {
        setCheckInputPass(true);
      }
    } else {
      setCheckInputUser(true);
    }
  };
  return (
    <Container className="mt-5">
      <div className="d-flex justify-content-center">
        <Form className="w-75 bg-primary-subtle p-3 rounded-4">
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
            {checkInputPass && <p>Min: 8 caracteres | Max: 50 caracteres</p>}
          </Form.Group>
          <Form.Group className="mb-3" controlId="repeatPassId">
            <Form.Label>Repetir contraseña</Form.Label>
            <Form.Control
              type="password"
              onChange={handleChange}
              name="repeatPass"
              placeholder="*************"
              className={
                checkInputPass ? "form-control is-invalid" : "form-control"
              }
            />
          </Form.Group>
          <div className="text-end">
            <Button variant="primary" onClick={handleClick}>
              Registrarse
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

export default RegisterEj6;
