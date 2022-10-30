"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const app_1 = __importDefault(require("../app"));
const supertest_1 = __importDefault(require("supertest"));
const database_config_1 = __importDefault(require("../config/database.config"));
const request = (0, supertest_1.default)(app_1.default);
beforeAll(async () => {
    await database_config_1.default.sync({ force: true }).then(() => {
        console.log('Test Database successfully created');
    });
});
describe('It should test all APIs', () => {
    // Testing for sign up
    it('it should create a user', async () => {
        const response = await request.post('/users/register').send({
            firstname: 'Oluwaseun',
            lastname: 'Akinruli',
            email: 'ruliseun11@gmail.com',
            gender: 'M',
            phone: '08143365109',
            address: 'Lagos',
            password: '12345',
            confirm_password: '12345',
        });
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('User created successfully');
        expect(response.body).toHaveProperty('userRecord');
    });
    //Login user
    it('should login a user', async () => {
        const response = await request.post('/users/login').send({
            email: 'ruliseun11@gmail.com',
            password: '12345',
        });
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Successfully logged in');
        expect(response.body).toHaveProperty('token');
        expect(response.body).toHaveProperty('User');
    });
});
