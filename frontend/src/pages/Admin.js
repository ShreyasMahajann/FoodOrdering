import { useEffect, useState } from "react";

const API_BASE = "http://localhost:8000";

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

export default Admin;
