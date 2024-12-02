const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const sessionMiddleware = require('./config/session');
const authRoutes = require('./routes/authRoutes');

dotenv.config();
connectDB();

const app = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(sessionMiddleware);
app.use(express.json());

//Motor de plantillas
app.set('view engine', 'ejs');


//Rutas
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
    if (req.session.user) {
        return res.redirect('/auth/dashboard');
    }
    res.render('login');
});

//Arrancar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
