import 'dotenv/config';
import app from '../app';
import supertest from 'supertest';

import testDb from '../config/database.config';

const request = supertest(app);

beforeAll(async () => {
  await testDb.sync({ force: true }).then(() => {
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

