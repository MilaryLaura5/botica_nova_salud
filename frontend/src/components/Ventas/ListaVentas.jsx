import React, { useEffect, useState } from 'react';
import { obtenerVentas } from '../../services/ventaService';

const ListaVentas = () => {
  const [ventas, setVentas] = useState([]);

  useEffect(() => {
    cargarVentas();
  }, []);

  const cargarVentas = async () => {
    const response = await obtenerVentas();
    setVentas(response.data);
  };

  return (
    <div>
      <h2>Lista de Ventas</h2>
      <ul>
        {ventas.map(venta => (
          <li key={venta.id}>
            Venta #{venta.id} - Total: S/ {venta.total} - Fecha: {new Date(venta.fecha).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaVentas;
