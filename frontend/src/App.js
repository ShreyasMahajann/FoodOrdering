import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Admin from "./pages/Admin";
import useProducts from "./hooks/useProducts";
import useCart from "./hooks/useCart";

function App() {
    const [user, setUser] = useState(null);

    // Check local storage for user on initial load
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const { products, addToCart } = useProducts(user);
    const { cart } = useCart(user);
    

    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route
                    path="/"
                    element={<Home products={products} addToCart={addToCart} user={user} setUser={setUser} />}
                />

                {/* Protected Routes */}
                <Route
                    path="/cart"
                    element={user ? <Cart cart={cart} /> : <Navigate to="/" />}
                />
                <Route
                    path="/admin"
                    element={user?.role === "admin" ? <Admin /> : <Navigate to="/" />}
                />

                {/* Fallback Route */}
                <Route path="*" element={<Navigate to="/" />}
                />
            </Routes>
        </Router>
    );
}

export default App;