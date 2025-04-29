import axios from 'axios';

//const API_URL = 'http://localhost:3001/api/productos';
const API_URL = 'http://localhost:3001/api/ventas';

export const obtenerVentas = () => axios.get(API_URL);
export const registrarVenta = (venta) => axios.post(API_URL, venta);
