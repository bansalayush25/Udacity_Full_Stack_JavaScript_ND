import { Product, ProductStore } from '../products';

const product: Product = {
  name: 'prod1',
  price: 50,
  category: 'cat1',
};
const store = new ProductStore();

describe('Product Model', () => {
    

  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

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
