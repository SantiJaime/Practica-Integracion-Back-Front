import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavbarComp = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to={"/"}>
          Inicio
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <NavLink className="nav-link" to={"/ej2"}>
              Ejercicio 2
            </NavLink>
            <NavLink className="nav-link" to={"/ej4"}>
              Ejercicio 4
            </NavLink>
            <NavLink className="nav-link" to={"/ej6"}>
              Ejercicio 6
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarComp;
