/* Replace with your SQL commands */
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    userId bigint REFERENCES users(id),
    productId bigint REFERENCES products(id),
    quantity integer,
    status BOOLEAN
);