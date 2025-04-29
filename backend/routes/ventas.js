const express = require('express');
const router = express.Router();
const ventaController = require('../controllers/ventaController');

router.get('/', ventaController.getAllVentas);
router.post('/', ventaController.createVentas);

module.exports = router;
