import { UserStore } from '../models/users';
import { user, token, TokenSet } from './util';

const store = new UserStore();
import supertest from 'supertest';
import app from '../server';

const request = supertest(app);

describe('User Model', () => {
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

    it('should have an authenticate method', () => {
      expect(store.login).toBeDefined();
    });
  });

  describe('Values check', () => {
    it('create method should add a user', async () => {
      const result = await store.create(user);
      expect(result.firstname).toMatch(user.firstname);
    });

    it('login the user', async () => {
      const loginUser = await store.login(user);
      expect(loginUser).toBeTruthy;
    });

    it('index method should return a list of users', async () => {
      const result = await store.index();
      expect(result).toContain(
        jasmine.objectContaining({
          firstname: user.firstname,
          lastname: user.lastname,
          id: 2,
        })
      );
    });

    it('show method should return the correct user', async () => {
      const result = await store.show('2');
      expect(result).toEqual(
        jasmine.objectContaining({
          id: 2,
          firstname: user.firstname,
          lastname: user.lastname,
        })
      );
    });
  });

  describe('Endpoint check', () => {
    it('login should return token', async () => {
      const res = await request.post('/users/login').send(user);
      expect(res.status).toBe(200);
    });
    it('create should return user', async () => {
      const res = await request
        .post('/users')
        .send(user)
        .set('Authorization', token);
      expect(res.status).toBe(200);
    });

    it('index should return users', async () => {
      const res = await request.get('/users').set('Authorization', token);
      expect(res.status).toBe(200);
    });
    it('show should return user', async () => {
      const res = await request.get('/users/1').set('Authorization', token);
      expect(res.status).toBe(200);
    });
  });
});
