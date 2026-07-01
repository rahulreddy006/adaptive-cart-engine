# DESIGN.md

# Adaptive E-Commerce Cart Engine – Design Decisions

## Overview

This project implements a production-ready shopping cart microservice using Node.js, Express.js, and MongoDB.

The primary goal was to design a backend that is modular, maintainable, and capable of handling multiple users with isolated shopping carts while supporting dynamic promotional pricing.

---

# Architecture

The project follows a layered architecture:

```
Client
   │
   ▼
Routes
   │
   ▼
Controllers
   │
   ▼
Services
   │
   ▼
Database (MongoDB)
```

### Why this architecture?

Each layer has a single responsibility.

- **Routes** define API endpoints.
- **Controllers** handle HTTP requests and responses.
- **Services** contain business logic.
- **Models** define MongoDB schemas.
- **Validators** validate incoming requests.
- **Middlewares** handle cross-cutting concerns such as validation and error handling.

Separating responsibilities makes the project easier to maintain, test, and extend.

---

# Schema Design

## User

A User contains:

- name
- email

Authentication was intentionally excluded because it was outside the assignment scope.

---

## Cart

Each cart belongs to exactly one user.

```
User
   │
   ▼
Cart
   │
   ▼
Items[]
```

The Cart stores:

- user
- items
- expiresAt

---

## Embedded Items

Cart items are stored as embedded documents instead of a separate collection.

Example:

```
Cart
{
    items:[
        {...},
        {...}
    ]
}
```

### Why embedded documents?

Cart items are always accessed together with their parent cart.

Embedding provides:

- Faster reads
- Simpler updates
- No joins
- Reduced database queries

---

# Multi-User Cart Isolation

The service supports multiple users by using the `x-user-id` request header.

Every cart operation retrieves data using the user identifier supplied in the request header.

Example:

```
x-user-id: 6867b6e2a86b4df9af6f8472
```

This simulates authenticated requests while keeping authentication outside the assignment scope.

---

# Business Logic

Business logic is placed inside the Service layer.

Examples include:

- Adding items
- Updating quantities
- Removing items
- Checkout calculations
- Promotion engine

Controllers remain lightweight and only coordinate requests and responses.

---

# Promotion Engine

The checkout process calculates:

- Subtotal
- Percentage discount
- Category bonus
- Final payable amount

Promotions are configuration-driven.

Current rules:

| Promotion | Condition | Benefit |
|------------|-----------|----------|
| Silver | Cart ≥ ₹10,000 | 10% Discount |
| Gold | Cart ≥ ₹50,000 | 20% Discount |
| Category Bonus | 3+ Categories | ₹500 Discount |

The engine always applies the highest eligible percentage discount.

---

# Validation Strategy

Request validation is performed using Zod before any request reaches the business logic.

Invalid requests immediately return a structured 400 Bad Request response.

This prevents malformed data from reaching MongoDB.

---

# Feature X

## Cart Expiration using MongoDB TTL

Each cart contains an `expiresAt` field.

Whenever the cart is updated, the expiration time is refreshed.

MongoDB automatically removes expired carts using a TTL Index.

Advantages:

- Automatic cleanup
- No scheduled jobs required
- Reduced database storage
- Better production readiness

---

# Error Handling

A centralized error handling middleware is used.

Common responses include:

- 400 Bad Request
- 404 Not Found
- 409 Conflict
- 500 Internal Server Error

This ensures consistent API responses across all endpoints.

---

# Edge Cases Considered

- Creating a cart for a new user
- Updating an existing item instead of creating duplicates
- Removing an item that does not exist
- Checkout with an empty cart
- Invalid request payloads
- Invalid user identifiers
- Duplicate user registration
- Expired carts

---

# Trade-offs

## Authentication

Authentication was intentionally excluded.

The project uses the `x-user-id` header to simulate authenticated users because authentication was outside the assignment scope.

---

## Product Collection

A separate Product collection was not created.

The assignment focuses on cart management rather than inventory management.

Keeping product information inside the cart simplifies the service.

---

## Embedded Cart Items

Embedded documents were chosen instead of a separate CartItem collection because cart items are never queried independently.

---

# Future Improvements

- JWT Authentication
- Product Inventory Service
- Coupon Management
- Payment Integration
- Order Service
- Redis Caching
- Event-driven architecture using a message queue
- Unit and Integration Tests

---

# Conclusion

The project was designed with simplicity, maintainability, and scalability in mind.

The architecture separates responsibilities across layers, business rules are isolated within services, request validation protects data integrity, and MongoDB features such as embedded documents and TTL indexes were used to improve performance and production readiness.