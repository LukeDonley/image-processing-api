import supertest from 'supertest';
import app from '..';

const request = supertest(app);

describe('Test endpoint responses', () => {
  it('gets api endpoint', async (done) => {
    const response = await request.get('/api');
    expect(response.status).toBe(200);
    done();
  });
});
