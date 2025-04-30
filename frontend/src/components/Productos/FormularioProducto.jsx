import React, { useState } from 'react';
import { agregarProducto } from '../../services/productoService'; // Asumo que tienes esta función en tu servicio

const FormularioProducto = ({ actualizarLista }) => {
  // Estado del formulario para almacenar los valores de cada campo
  const [producto, setProducto] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    stock_minimo: '',
    fecha_vencimiento: ''
  });

  // Función para actualizar el estado del producto cuando un campo cambia
  const handleChange = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Llamar al servicio para agregar el producto (asegúrate de que 'agregarProducto' esté bien implementado)
      await agregarProducto(producto);
      actualizarLista(); // Recargar la lista de productos después de agregar uno
      setProducto({
        nombre: '',
        descripcion: '',
        precio: '',
        stock: '',
        stock_minimo: '',
        fecha_vencimiento: ''
      });
    } catch (error) {
      console.error('Error al agregar el producto:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="formulario-producto">
      <h2>Agregar Producto</h2>
      <div className="mb-3">
        <label htmlFor="nombre" className="form-label">Nombre</label>
        <input 
          type="text" 
          name="nombre" 
          value={producto.nombre} 
          onChange={handleChange} 
          placeholder="Nombre del Producto"
          className="form-control" 
          required 
        />
      </div>
      <div className="mb-3">
        <label htmlFor="descripcion" className="form-label">Descripción</label>
        <input 
          type="text" 
          name="descripcion" 
          value={producto.descripcion} 
          onChange={handleChange} 
          placeholder="Descripción del Producto"
          className="form-control" 
        />
      </div>
      <div className="mb-3">
        <label htmlFor="precio" className="form-label">Precio</label>
        <input 
          type="number" 
          name="precio" 
          value={producto.precio} 
          onChange={handleChange} 
          placeholder="Precio"
          className="form-control" 
          required 
        />
      </div>
      <div className="mb-3">
        <label htmlFor="stock" className="form-label">Stock</label>
        <input 
          type="number" 
          name="stock" 
          value={producto.stock} 
          onChange={handleChange} 
          placeholder="Cantidad en Stock"
          className="form-control" 
          required 
        />
      </div>
      <div className="mb-3">
        <label htmlFor="stock_minimo" className="form-label">Stock Mínimo</label>
        <input 
          type="number" 
          name="stock_minimo" 
          value={producto.stock_minimo} 
          onChange={handleChange} 
          placeholder="Stock Mínimo"
          className="form-control" 
          required 
        />
      </div>
      <div className="mb-3">
        <label htmlFor="fecha_vencimiento" className="form-label">Fecha de Vencimiento</label>
        <input 
          type="date" 
          name="fecha_vencimiento" 
          value={producto.fecha_vencimiento} 
          onChange={handleChange} 
          className="form-control"
        />
      </div>
      <button type="submit" className="btn btn-primary">Guardar</button>
    </form>
  );
};

export default FormularioProducto;
