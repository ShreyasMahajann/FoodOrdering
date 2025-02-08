import { useState, useEffect } from "react";

const useProducts = (user) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:8000/products");
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setProducts(data.products || []); // Ensure `data.products` is an array
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchProducts();
    }, [user]);

    const addToCart = (product) => {
        // Add to cart logic here
        console.log("Added to cart:", product);
    };

    return { products, addToCart, loading, error };
};

export default useProducts;