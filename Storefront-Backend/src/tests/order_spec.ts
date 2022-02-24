import { OrderStore } from '../models/orders';
import { UserStore } from '../models/users';
import { ProductStore } from '../models/products';
import { order, product, user, order_product, token, TokenSet } from './util';
import supertest from 'supertest';
import app from '../server';

const request = supertest(app);

const orderstore = new OrderStore();
const productstore = new ProductStore();
const userstore = new UserStore();

describe('Order Model', () => {
  describe('Methods exist', () => {
    it('should have a show method', () => {
      expect(orderstore.show).toBeDefined();
    });

    it('should have a create method', () => {
      expect(orderstore.create).toBeDefined();
    });

    it('should have a addProduct method', () => {
      expect(orderstore.addProduct).toBeDefined();
    });
  });

  describe('Values check', () => {
    beforeAll(async () => {
      await userstore.create(user);
      await productstore.create(product);
      const res = await request.post('/users/login').send(user);
      TokenSet(res.body);
    });

    it('create method should add an order', async () => {
      const result = await orderstore.create(order);

      expect(result).toEqual(
        jasmine.objectContaining({
          user_id: order.user_id.toString(),
          status: order.status,
        })
      );
    });

    it('should show the correct order', async () => {
      const result = await orderstore.show('1');
      expect(result).toContain(
        jasmine.objectContaining({
          user_id: order.user_id.toString(),
          status: order.status,
        })
      );
    });

    it('should add the product in order', async () => {
      const result = await orderstore.addProduct(order_product);
      expect(result).toEqual(
        jasmine.objectContaining({
          id: 1,
          order_id: order_product.order_id.toString(),
          product_id: order_product.product_id.toString(),
          quantity: order_product.quantity,
        })
      );
    });
  });

  describe('Endpoint check', () => {
    it('create should return order', async () => {
      const res = await request
        .post('/orders')
        .send(order)
        .set('Authorization', token);
      expect(res.status).toBe(200);
    });

    it('show should return order', async () => {
      const res = await request.get('/orders/1').set('Authorization', token);
      expect(res.status).toBe(200);
    });

    it('addProduct should return order_product', async () => {
      const res = await request
        .post('/orders/1/product')
        .send(order_product)
        .set('Authorization', token);
      expect(res.status).toBe(200);
    });
  });
});
