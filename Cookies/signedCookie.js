const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3000;

//Configuracion de cookie parser con una clave secreta
app.use(cookieParser("CookieSecreta"));

app.get('/setCookie', (req,res)=>{
    //Establecer una cookie firmada
    res.cookie('CookieSecreta','Agustin', 
    { 
        signed: true,
        httpOnly: true,
    });
    res.send("Cookie firmada establecida!");
});

app.get('/getCookie', (req,res)=>{
    //Leer la signed cookie
    const nombre = req.signedCookies['CookieSecreta'];
    if(nombre){
        res.send(`Hola, ${nombre}`);
    }else{
        res.send("No se encontro la cookie firmada o ha sido manipulada");
    }
});

app.get('/clearCookie', (req,res)=>{
    res.clearCookie('CookieSecreta');
    res.send('Cookie eliminada!');
})

app.listen(port,()=>{
    console.log(`Servidor escuchando en http://localhost:${port}`);
})