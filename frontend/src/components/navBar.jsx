import React from 'react';

const NavBar = ({ setVista }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4 rounded shadow-sm">
      <div className="container">
        <span className="navbar-brand">Panel</span>
        <div className="d-flex">
          <button className="btn btn-outline-primary me-2" onClick={() => setVista('productos')}>
            Productos
          </button>
          <button className="btn btn-outline-success" onClick={() => setVista('ventas')}>
            Ventas
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
