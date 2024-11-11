const express = require('express');
const app = express();
const port = 3000;

//Middleware para leer las cookies
const cookieParser = require('cookie-parser');
app.use(cookieParser());

//SET COOKIE

app.get('/', (req,res)=>{
    //Establecer una cookie
    res.cookie('nombre','Juan', {
        //maxAge: 3000, // Duración de la cookie en milisegundos
        httpOnly: true, // Accesible solo a través de HTTP, no mediante JavaScript
        secure: true // Solo se enviará por HTTPS
    });
    res.send("Cookie establecida!");
});

//GET COOKIE

app.get('/verCookie', (req,res)=>{
    //Leer cookie
    const nombre = req.cookies['nombre'];
    res.send(`Hola, ${nombre}`);
});

//DELETE COOKIE

app.get('/clearCookie', (req,res)=>{
    res.clearCookie('nombre');
    res.send('Cookie eliminada!');
})

app.listen(port, () =>{
    console.log(`Servidor escuchando en  http://localhost:${port}`);
});