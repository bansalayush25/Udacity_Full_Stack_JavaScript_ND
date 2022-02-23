# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
### Products REQUIREMENT
- Index 
- Show
- Create [token required]
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

### Products SOLUTION
#### CREATE_REQUEST (POST http://localhost:3000/products/)

```
{
    "name": <name (string)>,
    "price" : <price  (number)>,
    "category": <category (string)>
}
```
#### CREATE_RESPONSE

```
{
    "id":1,
    "name": <name (string)>,
    "price" : <price  (number)>,
    "category": <category (string)>
}
```

#### GET_SPECIFIED_PRODUCT_REQUEST (POST http://localhost:3000/products/:id)
```
{
    "prodId": 1
}
```

#### GET_SPECIFIED_PRODUCT_RESPONSE

```
{
    "id":1,
    "name": <name (string)>,
    "price" : <price  (number)>,
    "category": <category (string)>
}
```

#### GET_ALL_REQUEST (GET http://localhost:3000/products)
```
<no body>
```

#### GET_ALL_RESPONSE

```
[
    {
        "id":1,
        "name": <name (string)>,
        "price" : <price  (number)>,
        "category": <category (string)>
    }
]
```

### Users REQUIREMENT
- Index [token required]
- Show [token required]
- Create N[token required]

### Users SOLUTION
#### CREATE_REQUEST (POST http://localhost:3000/users/)
```
{
    "first_name": <firstname (string)>,
    "last_name" : <lastname  (string)>,
    "password" : <password  (string)>
}
```

#### CREATE_RESPONSE
```
{
    "id": 1
    "first_name": <firstname (string)>,
    "last_name" : <lastname  (string)>,
    "password" : <password  (string)>
}
```

#### GET_ALL_REQUEST (POST http://localhost:3000/users)

```
{
    "userId": 1
}
```

#### GET_ALL_RESPONSE

```
[
    {
        "id": 1
        "first_name": <firstname (string)>,
        "last_name" : <lastname  (string)>,
        "password" : <password  (string)>
    }
]
```

#### LOGIN_REQUEST (POST http://localhost:3000/users/login)

```
{
    "first_name": <firstname (string)>,
    "last_name" : <lastname  (string)>,
    "password" : <password  (string)>
}
```

#### LOGIN_RESPONSE

```
{
    "token": <token (string)>,
}
```

### Orders REQUIREMENT
- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

### Orders SOLUTION
#### CREATE_ORDER_REQUEST (POST http://localhost:3000/orders)
```
<use token>
```

```
{
    "user_id": <user_id (number)>,
    "product_id": <product_id (number)>,
    "quantity": <quantity (number)>,
    "status" : <status  (boolean)>,
}
```

#### CREATE_ORDER_RESPONSE

```
{
    "id" : <id (number)>
    "user_id": <user_id (number)>,
    "product_id": <product_id (number)>,
    "quantity": <quantity (number)>,
    "status" : <status  (boolean)>,
}
```

#### GET_ALL_ORDERS FOR USER ID (GET http://localhost:3000/orders/:id)

{
    "userId": 1
}

#### GET_ALL_RESPONSE

```
[
    {
        "id" : <id (number)>
        "user_id": <user_id (number)>,
        "product_id": <product_id (number)>,
        "quantity": <quantity (number)>,
        "status" : <status  (boolean)>,
    }
]
```

## Data Shapes
### Product REQUIREMENT
-  id
- name
- price
- [OPTIONAL] category

### Product SOLUTION
Table: products (id:integer, name:varchar(100), price:integer, category::varchar(50))

### User REQUIREMENT
- id
- firstname
- lastname
- password

### User SOLUTION
Table: users (id:integer, firstname:varchar(50), lastname:varchar(50), password:varchar(100))


### Orders REQUIREMENT
- id
- product_id
- user_id
- quantity of each product in the order
- status of order (active or complete)

### Orders SOLUTION
Table: orders (id:integer, user_id:bigint[foreign key to users table], product_id:bigint[foreign key to products table], status:BOOLEAN)

