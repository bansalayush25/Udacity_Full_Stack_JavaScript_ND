import { Order, OrderStore } from '../orders';
import { User, UserStore } from '../users';
import { Product, ProductStore } from '../products';

const orderstore = new OrderStore();
const productstore = new ProductStore();
const userstore = new UserStore();

const user: User = {
  firstname: 'user_first',
  lastname: 'user_last',
  password: 'password',
};

const product: Product = {
  name: 'order_prod',
  price: 50,
  category: 'cat2',
};

const order: Order = {
  product_id: 1,
  user_id: 1,
  quantity: 10,
  status: false,
};

describe('Order Model', () => {
  beforeAll(async () => {
    await userstore.create(user);
    await productstore.create(product);
  });

  it('should have a show method', () => {
    expect(orderstore.show).toBeDefined();
  });

  it('create method should add an order', () => {
    expect(orderstore.create).toBeDefined();
  });

  it('create method should add an order', async () => {
    const result = await orderstore.create(order);
    
    expect(result).toEqual(
      jasmine.objectContaining({
        id: 1,
        product_id: order.product_id.toString(),
        user_id: order.user_id.toString(),
        quantity: order.quantity,
        status: order.status,
      })
    );
  });

  it('should show the correct order', async () => {
    const result = await orderstore.show('1');
    expect(result).toContain(
      jasmine.objectContaining({
        id: 1,
        product_id: order.product_id.toString(),
        user_id: order.user_id.toString(),
        quantity: order.quantity,
        status: order.status,
      })
    );
  });
});
