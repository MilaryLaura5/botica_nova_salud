import { useState } from 'react'
import ListaProductos from './components/Productos/ListaProductos';
import FormularioProducto from './components/Productos/FormularioProducto';
import ListaVentas from './components/Ventas/ListaVentas';
import FormularioVenta from './components/Ventas/FormularioVenta';

import './App.css'


function App() {
  return (
    <div className="App">
      <h1>Botica Nova Salud</h1>
      <FormularioProducto actualizarLista={() => window.location.reload()} />
      <ListaProductos />
      <FormularioVenta actualizarLista={() => window.location.reload()} />
      <ListaVentas />
    </div>
  );
}

export default App;
