const connection = require('../models/db');

exports.getAllProducts = (req, res) => {
  connection.query('SELECT * FROM productos', (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error al obtener los productos' });
    }
    res.json(results);
  });
};

exports.createProduct = (req, res) => {
  const { nombre, descripcion, precio, stock, stock_minimo, fecha_vencimiento } = req.body;

  connection.query(
    'INSERT INTO productos (nombre, descripcion, precio, stock, stock_minimo, fecha_vencimiento) VALUES (?, ?, ?, ?, ?, ?)',
    [nombre, descripcion, precio, stock, stock_minimo, fecha_vencimiento],
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Error al agregar el producto' });
      }
      res.status(201).json({ message: 'Producto agregado correctamente' });
    }
  );
};

exports.updateProduct = (req, res) => {
  const { nombre, descripcion, precio, stock, stock_minimo, fecha_vencimiento } = req.body;
  const { id } = req.params;

  connection.query(
    'UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, stock = ?, stock_minimo = ?, fecha_vencimiento = ? WHERE id = ?',
    [nombre, descripcion, precio, stock, stock_minimo, fecha_vencimiento, id],
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Error al actualizar el producto' });
      }
      res.json({ message: 'Producto actualizado correctamente' });
    }
  );
};

exports.deleteProduct = (req, res) => {
  const { id } = req.params;

  connection.query('DELETE FROM productos WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error al eliminar el producto' });
    }
    res.json({ message: 'Producto eliminado correctamente' });
  });
};
