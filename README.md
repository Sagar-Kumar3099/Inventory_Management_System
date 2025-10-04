# 📦 Warehouse Inventory System

A simple **full-stack warehouse inventory management system** built with **Node.js, Express, MongoDB**, and a lightweight **HTML/CSS/JavaScript frontend**.  

It allows users to:  
- Add, view, update, and delete products  
- Increase or decrease stock quantities  
- Highlight products below the low stock threshold  

---

## 🛠 Features

### Backend
- **CRUD** endpoints for products:
  - `POST /api/products` – create a product
  - `GET /api/products` – list all products
  - `GET /api/products/:id` – get product by ID
  - `PUT /api/products/:id` – update product
  - `DELETE /api/products/:id` – delete product
- **Inventory Management**
  - `POST /api/products/:id/increase` – increase stock
  - `POST /api/products/:id/decrease` – decrease stock (prevents negative stock)
- **Low Stock Detection**
  - `low_stock_threshold` field per product
  - Endpoint to get products below threshold (`GET /api/products/low-stock`)

### Frontend
- Add new products via form  
- Interactive table showing all products  
- Buttons to increase, decrease, or delete products  
- Highlights products below low stock threshold  

---

## 💻 Technologies Used
- **Backend:** Node.js, Express.js, MongoDB, Mongoose  
- **Frontend:** HTML, CSS, JavaScript  
- **Other:** CORS for frontend-backend communication  

---

## 🚀 Installation & Setup

1. **Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO
