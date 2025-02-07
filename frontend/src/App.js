import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

const API_BASE = "http://localhost:8000";

function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchProducts();
    if (user) fetchCart();
  }, [user]);

  const fetchProducts = async () => {
    const response = await fetch(`${API_BASE}/products`);
    const data = await response.json();
    setProducts(data);
  };

  const fetchCart = async () => {
    const response = await fetch(`${API_BASE}/user/cart`, {
      headers: { Authorization: `Bearer ${user?.token}` }
    });
    const data = await response.json();
    setCart(data);
  };

  const addToCart = async (product) => {
    await fetch(`${API_BASE}/user/add-to-cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`
      },
      body: JSON.stringify({ productId: product.id })
    });
    fetchCart();
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home products={products} addToCart={addToCart} />} />
        <Route path="/cart" element={user ? <Cart cart={cart} /> : <Navigate to="/" />} />
        <Route path="/admin" element={user?.role === "admin" ? <Admin /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

function Home({ products, addToCart }) {
  return (
    <div>
      <h1>Products</h1>
      {products.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>{product.price}</p>
          <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}

function Cart({ cart }) {
  return (
    <div>
      <h1>Cart</h1>
      {cart.map((item) => (
        <div key={item.id}>
          <h3>{item.name}</h3>
          <p>{item.quantity}</p>
        </div>
      ))}
    </div>
  );
}

function Admin() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const response = await fetch(`${API_BASE}/admin/orders`);
    const data = await response.json();
    setOrders(data);
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      <h2>Orders</h2>
      {orders.map((order) => (
        <div key={order.id}>
          <p>Order ID: {order.id}</p>
          <p>Status: {order.status}</p>
        </div>
      ))}
    </div>
  );
}

export default App;