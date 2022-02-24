import { Order, Order_Product } from '../models/orders';
import { Product } from '../models/products';
import { User } from '../models/users';

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
  user_id: 1,
  status: false,
};

const order_product: Order_Product = {
  order_id: 1,
  product_id: 1,
  quantity: 5,
};

let token: string = '';
function TokenSet(val: string) {
  token = val;
}

export { user, product, order, order_product, token, TokenSet };
