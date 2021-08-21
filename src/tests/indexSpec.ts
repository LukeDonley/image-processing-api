import supertest from 'supertest';
import app from '..';

const request = supertest(app);

describe('Test endpoint responses', () => {
  it('gets api/images endpoint', async () => {
    const response = await request.get('/api/images');
    expect(response.status).toBe(200);
  });

  it('returns 404 when non-existent image is provided', async () => {
    const response = await request.get('/api/images?filename=notfound.jpg');
    expect(response.status).toBe(404);
  });

  it('returns original file when no resize params sent', async () => {
    const response = await request.get('/api/images?filename=fjord.jpg');
    expect(response.status).toBe(200);
    expect(response.header['content-length']).toBe('2421874');
  });

  it('returns successfully when resize params are sent', async () => {
    const response = await request.get(
      '/api/images?filename=fjord.jpg&width=200&height=300'
    );
    expect(response.status).toBe(200);
    expect(response.header['content-length']).toBe('9379');
  });
});
