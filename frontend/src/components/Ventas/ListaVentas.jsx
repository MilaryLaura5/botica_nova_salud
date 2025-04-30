import React, { useEffect, useState } from 'react';
import { obtenerVentas } from '../../services/ventaService';

const ListaVentas = () => {
  const [ventas, setVentas] = useState([]);

  const cargarVentas = async () => {
    try {
      const res = await obtenerVentas();
      setVentas(res.data);
    } catch (error) {
      console.error('Error al cargar ventas:', error);
    }
  };

  const formatearFecha = (fechaISO) => {
    const fecha = new Date(fechaISO);
    return fecha.toLocaleString('es-PE', {
      dateStyle: 'short',
      timeStyle: 'short',
      hour12: true
    });
  };
  

  useEffect(() => {
    cargarVentas();
  }, []);

  return (
    <div>
      <h2>Lista de Ventas</h2>
      {ventas.length === 0 ? (
        <p>No hay ventas registradas.</p>
      ) : (
        ventas.map((venta) => (
          <div key={venta.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <p><strong>ID Venta:</strong> {venta.id}</p>
            <p><strong>Fecha:</strong> {venta.fecha}</p>
            <p><strong>Fecha:</strong> {formatearFecha(venta.fecha)}</p>
            <p><strong>ID Empleado:</strong> {venta.id_empleado}</p>
            <h4>Productos vendidos:</h4>
            <ul>
              {(venta.detalle_venta || []).map((detalle, index) => (
                <li key={index}>
                  Producto: {detalle.nombre_producto} | Cantidad: {detalle.cantidad} | Precio Unitario: S/ {detalle.precio_unitario}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default ListaVentas;
