const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const ventaRoutes = require("./routes/ventas");
app.use("/api/ventas", ventaRoutes);

module.exports = app;