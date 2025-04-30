import React, { useEffect, useState } from 'react';
import { obtenerProductos, eliminarProducto } from '../../services/productoService';
const ListaProductos = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      const response = await obtenerProductos();
      setProductos(response.data);
    };

    fetchProductos();
  }, []);

  const handleEliminar = async (id) => {
    try {
      await eliminarProducto(id);
      const response = await obtenerProductos(); // vuelve a traer la lista actualizada
      setProductos(response.data);

    } catch (error) {
      console.error('Error al eliminar producto:', error);
    }
  };
  

  return (
    <div>
      <h2>Lista de Productos</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Fecha de Vencimiento</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id}>
              <td>{producto.nombre}</td>
              <td>{producto.descripcion}</td>
              <td>{producto.precio}</td>
              <td>{producto.stock}</td>
              <td>{producto.fecha_vencimiento}</td>
              <td>
                <button onClick={() => handleEliminar(producto.id)} className="btn btn-danger">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaProductos;