import React, { useState } from 'react';
import { registrarVenta } from '../../services/ventaService';

const FormularioVenta = ({ actualizarLista }) => {
  const [venta, setVenta] = useState({ total: '' });

  const handleChange = (e) => {
    setVenta({ ...venta, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await registrarVenta(venta);
    actualizarLista();
    setVenta({ total: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registrar Venta</h2>
      <input type="number" name="total" value={venta.total} onChange={handleChange} placeholder="Total venta" required />
      <button type="submit">Registrar</button>
    </form>
  );
};

export default FormularioVenta;
