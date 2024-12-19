require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin.routes');
const cartRoutes = require('./routes/cart.routes');
require('dotenv').config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Conexión a la base de datos
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/carts', cartRoutes);

// Inicio del servidor
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

//Export para poder ser utilizado en los tests
module.exports = app;
