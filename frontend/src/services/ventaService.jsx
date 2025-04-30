import axios from 'axios';

//const API_URL = 'http://localhost:3001/api/productos';
const API_URL = 'http://localhost:3001/api/ventas';

export const obtenerVentas = () => axios.get(API_URL);
export const agregarVenta = (venta) => axios.post(API_URL, venta);
export const eliminarVenta = (id) => axios.delete(`${API_URL}/${id}`);