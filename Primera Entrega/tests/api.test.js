const request = require('supertest');
const app = require('../app'); // Importa tu app desde app.js
let adminToken;
let userToken;
let cartId;
let productId;

describe('Pruebas de endpoints de Usuario y Admin', () => {
  
  // Registro de un nuevo usuario
  it('Debería registrar un nuevo usuario', async () => {
    const res = await request(app)
      .post('/api/sessions/register')
      .send({
        email: 'testuser@mail.com',
        password: 'password123',
      });
  
    console.log(res.body);  // Esto te ayudará a ver el mensaje de error en la respuesta del servidor
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('message', 'Usuario registrado con éxito');
  });

  // Login de un usuario
  it('Debería hacer login del usuario y devolver un token', async () => {
    const res = await request(app)
      .post('/api/sessions/login')
      .send({
        email: 'testuser@mail.com',
        password: 'password123',
      });

    userToken = res.body.token; // Guardamos el token de usuario
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  // Creación de un producto como administrador
  it('Debería crear un producto como administrador', async () => {
    // Primero hacemos login como administrador
    const resAdminLogin = await request(app)
      .post('/api/sessions/login')
      .send({
        email: 'admin@mail.com',
        password: 'admin123',
      });
    adminToken = resAdminLogin.body.token;

    const res = await request(app)
      .post('/api/admin/products')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Nuevo Producto',
        price: 100,
        description: 'Descripción del producto',
        stock: 50
      });

    productId = res.body._id; // Guardamos el ID del producto creado
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('_id');
  });

  // Modificar un producto como administrador
  it('Debería actualizar un producto como administrador', async () => {
    const res = await request(app)
      .put(`/api/admin/products/${productId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Producto Actualizado',
        price: 120,
        description: 'Descripción actualizada',
        stock: 40
      });

    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Producto Actualizado');
  });

  // No debería permitir crear un producto como usuario
  it('No debería permitir crear un producto como usuario', async () => {
    const res = await request(app)
      .post('/api/admin/products')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        name: 'Producto No Permitido',
        price: 50,
        description: 'Descripción del producto no permitido',
        stock: 30
      });

    expect(res.status).toBe(403); // El código 403 indica "Forbidden"
  });

  // Agregar un producto al carrito como usuario
  it('Debería crear un ticket a partir de los productos del carrito como usuario', async () => {
    // Supongamos que cartId está previamente configurado
    const res = await request(app)
      .post(`/api/carts/${cartId}/add`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({ productId });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message', 'Producto agregado al carrito');
  });

  // El administrador debería poder obtener todos los productos
  it('El administrador debería poder obtener todos los productos', async () => {
    const res = await request(app)
      .get('/api/admin/products')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  // El usuario debería poder ver sus productos en el carrito
  it('El usuario debería poder ver sus productos en el carrito', async () => {
    const res = await request(app)
      .get(`/api/carts/${cartId}`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('products');
  });

});

