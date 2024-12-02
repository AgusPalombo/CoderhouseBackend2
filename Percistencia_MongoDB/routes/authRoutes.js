const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Ruta de registro
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    
    try {
        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).send('El usuario ya existe');
        }

        // Crear nuevo usuario
        const user = new User({
            username,
            password
        });
        await user.save();

        res.redirect('/?registered=true');
        
    } catch (error) {
        console.error('Error en registro:', error);
        res.status(500).send('Error al registrar usuario');
    }
});

// Ruta de login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    
    try {
        // Buscar usuario
        const user = await User.findOne({ username });
        
        if (!user || user.password !== password) {
            return res.status(401).send('Usuario o contraseña incorrectos');
        }

        // Login exitoso
        user.loginHistory.push({
            timestamp: new Date(),
            successful: true
        });
        await user.save();

        // Guardar en sesión
        req.session.user = {
            username: user.username,
            id: user._id
        };
        
        return res.redirect('/auth/dashboard');
        
    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).send('Error en el servidor');
    }
});

// Ruta del dashboard
router.get('/dashboard', async (req, res) => {
    if (!req.session.user) {
        return res.redirect('/');
    }
    
    try {
        const user = await User.findById(req.session.user.id);
        res.render('dashboard', { 
            user: req.session.user,
            loginHistory: user.loginHistory 
        });
    } catch (error) {
        console.error('Error al cargar dashboard:', error);
        res.status(500).send('Error al cargar el dashboard');
    }
});

// Ruta de logout
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Error al cerrar sesión');
        }
        res.clearCookie('connect.sid');
        res.redirect('/');
    });
});

module.exports = router;
