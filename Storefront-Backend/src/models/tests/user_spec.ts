import { User, UserStore } from '../users';

const store = new UserStore();

const user: User = {
  firstname: 'first',
  lastname: 'last',
  password: 'password',
};

describe('User Model', () => {
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
