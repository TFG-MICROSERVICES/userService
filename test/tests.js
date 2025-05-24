import request from 'supertest';
import { expect } from 'chai';
import express from 'express';
import userRoutes from '../routes/userRoutes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/user', userRoutes);

// Añadir el middleware de manejo de errores
app.use((err, req, res, next) => {
    console.log("Error in test:", err);
    res.status(err.status || 500).json({
        message: err.message,
    });
});

describe('User Endpoints', () => {
    let createdUserId;

    describe('POST /user/register', () => {
        it('Deberia registrar un usuario correctamente', async () => {
            const userData = {
                email: 'test@example.com',
                name: 'Test',
                lastName: 'User',
                birthdate: '1990-01-01',
                city: 'Madrid',
                autonomous_region: 'Madrid',
                phone_number: '123456788',
                main_sport_id: 1
            };

            const response = await request(app)
                .post('/user/register')
                .set('x-api-key', process.env.API_GATEWAY_KEY)
                .send(userData);

            expect(response.status).to.equal(201);
            expect(response.body).to.have.property('message');
            expect(response.body.message).to.equal('Usuario registrado correctamente');
            
            // Guardamos el ID para usarlo en las pruebas posteriores
            createdUserId = response.body.user._id;
        });

        it('Deberia fallar si el email ya existe', async () => {
            const userData = {
                email: 'test@example.com',
                name: 'Test',
                lastName: 'User',
                birthdate: '1990-01-01',
                city: 'Madrid',
                autonomous_region: 'Madrid',
                phone_number: '123456788',
                main_sport_id: 1
            };

            const response = await request(app)
                .post('/user/register')
                .set('x-api-key', process.env.API_GATEWAY_KEY)
                .send(userData);

            expect(response.status).to.equal(400);
            expect(response.body).to.have.property('message');
            expect(response.body.message).to.equal('Este correo electrónico ya está registrado');
        });

        it('Debería fallar si faltan campos obligatorios', async () => {
            const userData = {
                email: 'test@example.com',
                password: 'Test123!'
                // Faltan campos obligatorios: name, lastName, birthdate, city, autonomous_region
            };

            const response = await request(app)
                .post('/user/register')
                .set('x-api-key', process.env.API_GATEWAY_KEY)
                .send(userData);

            expect(response.status).to.equal(500);
            expect(response.body).to.have.property('message');
        });

        it('Debería fallar si no viene api key', async () => {
            const userData = {
                email: 'test@example.com',
                name: 'Test',
                lastName: 'User',
                birthdate: '1990-01-01',
                city: 'Madrid',
                autonomous_region: 'Madrid',
                phone_number: '123456788',
                main_sport_id: 1
            };

            const response = await request(app)
                .post('/user/register')
                .send(userData);

            expect(response.status).to.equal(403);
            expect(response.body).to.have.property('message');
            expect(response.body).to.deep.equal({
                message: "Acceso denegado"
            });
        });
    });

    describe('GET /user/:user_id', () => {
        it('Debería obtener un usuario por su ID correctamente', async () => {
            // Primero registramos un usuario para obtener su ID
            const userData = {
                email: 'test2@example.com',
                name: 'Test',
                lastName: 'User',
                birthdate: '1990-01-01',
                city: 'Madrid',
                autonomous_region: 'Madrid',
                phone_number: '1234567888',
                main_sport_id: 1
            };

            const registerResponse = await request(app)
                .post('/user/register')
                .set('x-api-key', process.env.API_GATEWAY_KEY)
                .send(userData);

            const userId = registerResponse.body.user.id;
l
            // Ahora intentamos obtener el usuario por su ID
            const response = await request(app)
                .get(`/user/${userId}`)
                .set('x-api-key', process.env.API_GATEWAY_KEY);

            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('user');
            expect(response.body).to.have.property('message');
            expect(response.body).to.deep.equal({
                message: "Usuario encontrado"
            });
        });

        it('Debería fallar al intentar obtener un usuario con ID inválido', async () => {
            const response = await request(app)
                .get('/user/invalid-id')
                .set('x-api-key', process.env.API_GATEWAY_KEY);

            expect(response.status).to.equal(404);
        });
    });
});
