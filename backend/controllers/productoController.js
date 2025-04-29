const db = require('../models/db');

// Obtener todos los productos
exports.obtenerProductos = (req, res) => {
  db.query('SELECT * FROM productos', (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).json(results);
  });
};

// Agregar un producto
exports.agregarProducto = (req, res) => {
  const { nombre, descripcion, precio, stock, stock_minimo, fecha_vencimiento } = req.body;
  const query = 'INSERT INTO productos (nombre, descripcion, precio, stock, stock_minimo, fecha_vencimiento) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [nombre, descripcion, precio, stock, stock_minimo, fecha_vencimiento], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(201).json({ id: results.insertId, nombre });
  });
};

// Actualizar un producto
exports.actualizarProducto = (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, precio, stock, stock_minimo, fecha_vencimiento } = req.body;
  const query = 'UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, stock = ?, stock_minimo = ?, fecha_vencimiento = ? WHERE id = ?';
  db.query(query, [nombre, descripcion, precio, stock, stock_minimo, fecha_vencimiento, id], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).json({ id, nombre });
  });
};

// Eliminar un producto
exports.eliminarProducto = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM productos WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).json({ message: 'Producto eliminado' });
  });
};
