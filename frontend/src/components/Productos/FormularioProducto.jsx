import React, { useState } from 'react';
import { agregarProducto } from '../../services/productoService';

const FormularioProducto = ({ actualizarLista }) => {
  const [producto, setProducto] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    stock_minimo: '',
    fecha_vencimiento: ''
  });

  const handleChange = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await agregarProducto(producto);
    actualizarLista();
    setProducto({
      nombre: '',
      descripcion: '',
      precio: '',
      stock: '',
      stock_minimo: '',
      fecha_vencimiento: ''
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Agregar Producto</h2>
      <input type="text" name="nombre" value={producto.nombre} onChange={handleChange} placeholder="Nombre" required />
      <input type="text" name="descripcion" value={producto.descripcion} onChange={handleChange} placeholder="Descripción" />
      <input type="number" name="precio" value={producto.precio} onChange={handleChange} placeholder="Precio" required />
      <input type="number" name="stock" value={producto.stock} onChange={handleChange} placeholder="Stock" required />
      <input type="number" name="stock_minimo" value={producto.stock_minimo} onChange={handleChange} placeholder="Stock mínimo" required />
      <input type="date" name="fecha_vencimiento" value={producto.fecha_vencimiento} onChange={handleChange} />
      <button type="submit">Guardar</button>
    </form>
  );
};

export default FormularioProducto;
