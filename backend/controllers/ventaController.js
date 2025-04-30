const connection = require('../models/db');

// Obtener todas las ventas con sus detalles
exports.getAllVentas = (req, res) => {
  console.log('Obteniendo todas las ventas con detalles...');
  connection.query('SELECT * FROM ventas', (err, ventas) => {
    if (err) {
      return res.status(500).json({ message: 'Error al obtener las ventas' });
    }

    const ventasConDetalle = [];

    const obtenerDetalles = (index) => {
      console.log('Detalles de venta para ID:', venta.id);
      if (index === ventas.length) {
        return res.json(ventasConDetalle); // ya se cargaron todos los detalles
      }

      const venta = ventas[index];

      connection.query(
        `SELECT dv.*, p.nombre AS nombre_producto 
         FROM detalle_venta dv 
         JOIN productos p ON dv.id_producto = p.id 
         WHERE dv.id_venta = ?`,
        [venta.id],
        (err, detalles) => {
          if (err) {
            return res.status(500).json({ message: 'Error al obtener detalles de venta' });
          }

          ventasConDetalle.push({
            ...venta,
            detalle_venta: detalles,
          });

          obtenerDetalles(index + 1); // siguiente venta
        }
      );
    };

    if (ventas.length === 0) {
      return res.json([]); // No hay ventas
    }

    obtenerDetalles(0); // Iniciar el recorrido
  });
};

// Crear una venta con múltiples productos
exports.createVentas = (req, res) => {
  const { id_empleado, productos } = req.body;

  const totalVenta = productos.reduce((total, p) => total + p.precio_unitario * p.cantidad, 0);

  connection.query(
    'INSERT INTO ventas (fecha, total, id_empleado) VALUES (NOW(), ?, ?)',
    [totalVenta, id_empleado],
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
