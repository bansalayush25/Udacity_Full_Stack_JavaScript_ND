import { ProductStore } from '../models/products';
import supertest from 'supertest';
import app from '../server';

import { product, token } from './util';
const request = supertest(app);

const store = new ProductStore();

describe('Product Model', () => {
  describe('Function check', () => {
    it('should have an index method', () => {
      expect(store.index).toBeDefined();
    });

    it('should have a show method', () => {
      expect(store.show).toBeDefined();
    });

    it('should have a create method', () => {
      expect(store.create).toBeDefined();
    });
  });

  describe('Values check', () => {
    it('create method should add a product', async () => {
      const result = await store.create(product);
      expect(result).toEqual(
        jasmine.objectContaining({
          id: 2,
          name: product.name,
          price: product.price,
          category: product.category,
        })
      );
    });

    it('index method should return a list of products', async () => {
      const result = await store.index();
      expect(result).toContain(
        jasmine.objectContaining({
          id: 2,
          name: product.name,
          price: product.price,
          category: product.category,
        })
      );
    });

    it('show method should return the correct product', async () => {
      const result = await store.show('2');
      expect(result).toEqual(
        jasmine.objectContaining({
          id: 2,
          name: product.name,
          price: product.price,
          category: product.category,
        })
      );
    });
  });

  describe('Endpoint check', () => {
    it('create should return product', async () => {
      const res = await request
        .post('/products')
        .send(product)
        .set('Authorization', token);
      expect(res.status).toBe(200);
    });
    it('index should return products', async () => {
      const res = await request.get('/products').set('Authorization', token);
      expect(res.status).toBe(200);
    });
    it('show should return product', async () => {
      const res = await request.get('/products/1').set('Authorization', token);
      expect(res.status).toBe(200);
    });
  });
});
