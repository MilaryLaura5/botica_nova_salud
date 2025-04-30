import React, { useState, useEffect } from 'react';
import { agregarVenta } from '../../services/ventaService';
import { obtenerProductos } from '../../services/productoService';

const FormularioVenta = ({ actualizarLista }) => {
  const [productos, setProductos] = useState([]);
  const [detalleVenta, setDetalleVenta] = useState([]);
  const [id_empleado, setIdEmpleado] = useState('');
  
  useEffect(() => {
    const fetchProductos = async () => {
      const res = await obtenerProductos();
      setProductos(res.data);
    };
    fetchProductos();
  }, []);

  const agregarProducto = () => {
    setDetalleVenta([...detalleVenta, {
      id_producto: '',
      cantidad: '',
      precio_unitario: ''
    }]);
  };

  const handleChangeDetalle = (index, field, value) => {
    const nuevosDetalles = [...detalleVenta];
    nuevosDetalles[index][field] = value;
    setDetalleVenta(nuevosDetalles);
  };

  const eliminarProducto = (index) => {
    const nuevosDetalles = [...detalleVenta];
    nuevosDetalles.splice(index, 1);
    setDetalleVenta(nuevosDetalles);
  };

  const calcularTotal = () => {
    return detalleVenta.reduce((sum, p) => sum + (parseFloat(p.precio_unitario || 0) * parseInt(p.cantidad || 0)), 0).toFixed(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const venta = {
      id_empleado: parseInt(id_empleado),
      productos: detalleVenta.map(p => ({
        id_producto: parseInt(p.id_producto),
        cantidad: parseInt(p.cantidad),
        precio_unitario: parseFloat(p.precio_unitario)
      }))
    };

    try {
      await agregarVenta(venta);
      actualizarLista();
      setIdEmpleado('');
      setDetalleVenta([]);
    } catch (error) {
      console.error('Error al registrar la venta:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registrar Venta</h2>
      <input
        type="number"
        name="id_empleado"
        value={id_empleado}
        onChange={(e) => setIdEmpleado(e.target.value)}
        placeholder="ID Empleado"
        required
      />

      {detalleVenta.map((detalle, index) => (
        <div key={index}>
          <select
            value={detalle.id_producto}
            onChange={(e) => handleChangeDetalle(index, 'id_producto', e.target.value)}
            required
          >
            <option value="">Seleccione un producto</option>
            {productos.map((p) => (
              <option key={p.id || p._id} value={p.id || p._id}>
                {p.nombre}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Cantidad"
            value={detalle.cantidad}
            onChange={(e) => handleChangeDetalle(index, 'cantidad', e.target.value)}
            required
          />

          <input
            type="number"
            step="0.01"
            placeholder="Precio Unitario"
            value={detalle.precio_unitario}
            onChange={(e) => handleChangeDetalle(index, 'precio_unitario', e.target.value)}
            required
          />

          <button type="button" onClick={() => eliminarProducto(index)}>Eliminar</button>
        </div>
      ))}

      <button type="button" onClick={agregarProducto}>+ Añadir Producto</button>

      <p><strong>Total:</strong> S/ {calcularTotal()}</p>
      
      <button type="submit">Registrar Venta</button>
    </form>
  );
};

export default FormularioVenta;
