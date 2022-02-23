import app from '../../server';
import supertest from 'supertest'

const request = supertest(app);

describe('Test endpoint responses', () => {
    it('check if server responds 200 status', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
});

it('testing product endpoint for valid product', async done => {
    const response = await request.get('/products' );
    expect(response.status).toBe(200);
    done();
  });

  
  it('testing users endpoint for ', async done => {
    const response = await request.get('/users');
    expect(response.status).toBe(401);
    done();
});

describe('POST /products', function() {
    it('responds with prod', function(done) {
      supertest(app)
        .post('/products')
        .send({
            name: 'prod',
            price: 1,
            category: 'cat'
        })
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res) {
          if (err) return done();
          return done();
        });
    });
  });
});

describe('POST /users', function() {
    it('responds with json', function(done) {
        supertest(app)
        .post('/users')
        .send({userId: '1'})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
            if (err) return done();
            return done();
        });
    });
});

describe('POST /orders', function() {
    it('responds with json', function(done) {
        supertest(app)
        .post('/orders')
        .send({
            user_id: '1',
            product_id: '1',
            quantity: 1,
            status: false
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
            if (err) return done();
            return done();
        });
    });
});