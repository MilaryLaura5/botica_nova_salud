const db = require('../models/db');

// Obtener todas las ventas
exports.obtenerVentas = (req, res) => {
  db.query('SELECT * FROM ventas', (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).json(results);
  });
};

// Registrar una venta
exports.registrarVenta = (req, res) => {
  const { total } = req.body;
  const fecha = new Date();
  const query = 'INSERT INTO ventas (fecha, total) VALUES (?, ?)';
  db.query(query, [fecha, total], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(201).json({ id: results.insertId, total });
  });
};
