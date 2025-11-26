# 📦 E-Commerce (React + Platzi Fake Store API)

A modern and simple E-Commerce web application built using **React**, **Vite**, **TailwindCSS**.  
Users can **create an account**, **log in**, **browse products**, **search**, and **filter** by category and price.  

---

## 🚀 Features

### 👤 User Authentication

- Create a new user using Platzi Fake Store API
- Login with email & password
- Receive an `access_token` for authentication
- Token is used for protected API calls

### 🛍 Product Browsing

- View all products
- Search products by title
- Filter by:
  - **Category**
  - **Minimum price**
  - **Maximum price**
- Add to cart
- Remove from cart
- Persistent cart using **localStorage**

---

## 🛠 Tech Stack

| Layer            | Technology               |
| ---------------- | ------------------------ |
| Frontend         | React, Vite, TailwindCSS |
| Routing          | react-router-dom         |
| API              | Platzi Fake Store API    |
| State Management | React Hooks              |
| Upcoming         | localStorage Cart        |

---

## 🔗 Platzi Fake Store API

This project integrates the official **Platzi Fake Store API**.  
Used endpoints include:

- `POST /users` – User registration
- `POST /auth/login` – Login - receive access token & refresh token
- `GET /products` – Fetch all products
- `GET /categories` – Fetch categories

---
