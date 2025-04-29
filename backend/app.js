const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const ProductoRoutes = require("./routes/productos");
app.use("/api/productos", ProductoRoutes);

const VentaRoutes = require("./routes/ventas");
app.use("/api/ventas", VentaRoutes);


module.exports = app;