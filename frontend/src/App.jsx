// src/App.jsx
import { useState } from 'react';
import NavBar from './components/navBar';
import ListaProductos from './components/Productos/ListaProductos';
import FormularioProducto from './components/Productos/FormularioProducto';
import ListaVentas from './components/Ventas/ListaVentas';
import FormularioVenta from './components/Ventas/FormularioVenta';

import './App.css';

function App() {
  return (
    <div className="App">
      <NavBar />
      <h1>Botica Nova Salud</h1>
      <div className="container">
        <FormularioProducto actualizarLista={() => window.location.reload()} />
        <ListaProductos />
        <FormularioVenta actualizarLista={() => window.location.reload()} />
        <ListaVentas />
      </div>
    </div>
  );
}

export default App;
