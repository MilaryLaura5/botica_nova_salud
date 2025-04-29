const connection = require('../models/db');

exports.getAllVentas = (req, res) => {
  connection.query('SELECT * FROM ventas', (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error al obtener las ventas' });
    }
    res.json(results);
  });
};

exports.createVentas = (req, res) => {
  const { id_empleado, productos } = req.body; // Suponiendo que productos es un array de objetos con id y cantidad

  // Insertar venta
  connection.query(
    'INSERT INTO ventas (fecha, total, id_empleado) VALUES (NOW(), ?, ?)',
    [productos.reduce((total, p) => total + p.precio_unitario * p.cantidad, 0), id_empleado],
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Error al registrar la venta' });
      }

      const ventaId = results.insertId;

      // Insertar detalle de la venta
      productos.forEach(p => {
        connection.query(
          'INSERT INTO detalle_venta (id_venta, id_producto, cantidad, precio_unitario) VALUES (?, ?, ?, ?)',
          [ventaId, p.id_producto, p.cantidad, p.precio_unitario],
          err => {
            if (err) {
              return res.status(500).json({ message: 'Error al registrar el detalle de la venta' });
            }
          }
        );
      });

      res.status(201).json({ message: 'Venta registrada correctamente' });
    }
  );
};
