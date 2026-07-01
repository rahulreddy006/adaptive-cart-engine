# Adaptive E-Commerce Cart Engine

A production-ready Shopping Cart Engine built using **Node.js**, **Express.js**, and **MongoDB**.

This project was developed as part of a Backend Engineering assessment and demonstrates clean architecture, multi-user cart isolation, dynamic pricing, validation, and production-ready backend features.

---

# Features

- Multi-user cart isolation using `x-user-id`
- Add or update items in a shopping cart
- Dynamic promotion engine
- Checkout summary
- Remove items from cart
- Automatic cart expiration using MongoDB TTL Index
- Request validation using Zod
- Centralized error handling
- Layered architecture (Routes → Controllers → Services → Models)

---

# Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- Zod
- dotenv
- Helmet
- Morgan
- CORS

---

# Project Structure

```
src/
│
├── config/
├── controllers/
├── middlewares/
├── models/
├── routes/
├── services/
├── utils/
├── validators/
├── app.js
└── server.js
```

---

# API Endpoints

## Create User

POST /api/v1/users

Body

```json
{
    "name":"Rahul",
    "email":"rahul@gmail.com"
}
```

---

## Add Item

POST /api/v1/cart/items

Headers

```
x-user-id : USER_ID
```

Body

```json
{
    "productId":"P100",
    "name":"Keyboard",
    "price":10000,
    "quantity":2,
    "category":"Electronics"
}
```

---

## Checkout

GET /api/v1/cart/checkout

Headers

```
x-user-id : USER_ID
```

---

## Remove Item

DELETE /api/v1/cart/items/:productId

Headers

```
x-user-id : USER_ID
```

---

# Promotion Engine

## Silver Discount

Subtotal ≥ ₹10,000

10% Discount

---

## Gold Discount

Subtotal ≥ ₹50,000

20% Discount

---

## Category Bonus

If cart contains products from **3 or more unique categories**

Extra ₹500 discount

---

# Feature X

## Cart Expiration using MongoDB TTL

Each cart contains an `expiresAt` field.

Whenever the cart is updated:

- expiration time is refreshed

MongoDB automatically removes expired carts using a TTL Index.

This keeps the database free from abandoned shopping carts without requiring scheduled cleanup jobs.

---

# Validation

All incoming requests are validated using Zod before reaching the business logic.

---

# Installation

Clone the repository

```bash
git clone <repository-url>
```

Install packages

```bash
npm install
```

Create `.env`

```
PORT=5000
MONGO_URI=your_connection_string
```

Run

```bash
npm run dev
```

---

# Future Improvements

- Authentication using JWT
- Product inventory validation
- Coupon engine
- Order placement
- Payment gateway integration
- Redis cart caching