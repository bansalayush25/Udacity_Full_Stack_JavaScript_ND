/* Replace with your SQL commands */
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id bigint REFERENCES users(id),
    product_id bigint REFERENCES products(id),
    quantity integer,
    status BOOLEAN
);