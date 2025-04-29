import React, { useEffect, useState } from 'react';
import { obtenerProductos, eliminarProducto } from '../../services/productoService';

const ListaProductos = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    const response = await obtenerProductos();
    setProductos(response.data);
  };

  const handleEliminar = async (id) => {
    await eliminarProducto(id);
    cargarProductos();
  };

  return (
    <div>
      <h2>Lista de Productos</h2>
      <ul>
        {productos.map(producto => (
          <li key={producto.id}>
            {producto.nombre} - {producto.stock} unidades
            <button onClick={() => handleEliminar(producto.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaProductos;
