import request from 'supertest';
import app from '../server.js'; // Adjust this path if needed

describe('GET /api/items/lost', () => {
  it('should return all lost items', async () => {
    const res = await request(app).get('/api/items/lost');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body.data).toBeInstanceOf(Array);
  });
});

describe('GET /api/items/found', () => {
  it('should return all found items', async () => {
    const res = await request(app).get('/api/items/found');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body.data).toBeInstanceOf(Array);
  });
});
