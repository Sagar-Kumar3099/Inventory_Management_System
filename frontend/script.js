const API_URL = "http://localhost:5000/api/products"; // adjust if needed

// Fetch and display products
async function fetchProducts() {
  const res = await fetch(API_URL);
  const products = await res.json();

  const table = document.getElementById("productTable");
  table.innerHTML = "";

  products.forEach(product => {
    const row = document.createElement("tr");
    if (product.stock_quantity < product.low_stock_threshold) {
      row.classList.add("low-stock");
    }
    row.innerHTML = `
      <td>${product.name}</td>
      <td>${product.description || ""}</td>
      <td>${product.stock_quantity}</td>
      <td>${product.low_stock_threshold}</td>
      <td>
        <button class="action" onclick="increaseStock('${product._id}')">+1</button>
        <button class="action" onclick="decreaseStock('${product._id}')">-1</button>
        <button class="action" onclick="deleteProduct('${product._id}')">Delete</button>
      </td>
    `;
    table.appendChild(row);
  });
}

// Create new product
document.getElementById("productForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const newProduct = {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    stock_quantity: Number(document.getElementById("stock_quantity").value),
    low_stock_threshold: Number(document.getElementById("low_stock_threshold").value),
  };

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newProduct)
  });

  e.target.reset();
  fetchProducts();
});

// Increase stock
async function increaseStock(id) {
  await fetch(`${API_URL}/${id}/increase`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ quantity: 1 })
  });
  fetchProducts();
}

// Decrease stock
async function decreaseStock(id) {
  await fetch(`${API_URL}/${id}/decrease`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ quantity: 1 })
  });
  fetchProducts();
}

// Delete product
async function deleteProduct(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  fetchProducts();
}

// Initial load
fetchProducts();
